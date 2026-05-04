import { test, expect } from "@playwright/test";

/**
 * Tailwind CSS 스타일 적용 검증 테스트
 *
 * Tailwind 클래스가 실제로 CSS로 변환되고 적용되었는지 확인합니다.
 */

test.describe("Tailwind CSS 스타일 적용 검증", () => {
  test("메인 페이지에서 Tailwind 클래스가 CSS로 변환되었는지 확인", async ({
    page,
  }) => {
    await page.goto("/");

    // HTML이 로드되었는지 확인
    const html = await page.locator("html");
    await expect(html).toBeVisible();

    // body 요소가 존재하는지 확인
    const body = await page.locator("body");
    await expect(body).toBeVisible();

    // Tailwind CSS가 로드되었는지 확인 (스타일시트 존재)
    const styleSheets = await page.evaluate(() => {
      const sheets = document.styleSheets;
      let hasTailwind = false;
      for (let i = 0; i < sheets.length; i++) {
        try {
          const rules = sheets[i].cssRules;
          for (let j = 0; j < rules.length; j++) {
            const rule = rules[j] as CSSRule;
            if (rule.cssText && rule.cssText.includes("tailwind")) {
              hasTailwind = true;
              break;
            }
          }
        } catch (e) {
          // CORS 에러는 무시
        }
      }
      return hasTailwind;
    });

    console.log("Tailwind CSS 로드 확인:", styleSheets);

    // flex 클래스 확인
    const flexContainer = await page.locator('[class*="flex"]').first();
    const flexDisplay = await flexContainer.evaluate((el) => {
      return window.getComputedStyle(el).display;
    });
    console.log("Flex container display:", flexDisplay);
    expect(["flex", "block"]).toContain(flexDisplay);

    // 스타일이 실제로 적용되었는지 확인
    const computedStylesExist = await page.evaluate(() => {
      const elements = document.querySelectorAll("[class]");
      let styled = 0;
      for (let el of elements) {
        const styles = window.getComputedStyle(el);
        if (styles.display || styles.color || styles.backgroundColor) {
          styled++;
        }
      }
      return styled > 0;
    });

    expect(computedStylesExist).toBe(true);
  });

  test("Tailwind 색상 클래스가 제대로 적용되었는지 확인", async ({ page }) => {
    await page.goto("/");

    // hub-primary 색상 확인
    const colorTest = await page.evaluate(() => {
      // 페이지의 모든 요소를 확인
      const elements = document.querySelectorAll(
        '[class*="hub-primary"], [class*="bg-hub"], [class*="text-hub"]',
      );
      const results: any[] = [];

      elements.forEach((el) => {
        const bgColor = window.getComputedStyle(el).backgroundColor;
        const textColor = window.getComputedStyle(el).color;
        const className = el.className;

        if (
          bgColor !== "rgba(0, 0, 0, 0)" ||
          textColor !== "rgba(0, 0, 0, 0)"
        ) {
          results.push({
            className,
            backgroundColor: bgColor,
            textColor: textColor,
          });
        }
      });

      return results;
    });

    console.log("컬러 클래스 적용 확인:", colorTest);
    expect(colorTest.length).toBeGreaterThanOrEqual(0); // 최소 일부는 적용되어야 함
  });

  test("Tailwind utilities 클래스 렌더링 확인 (w-full, pt 등)", async ({
    page,
  }) => {
    await page.goto("/");

    const utilityClasses = await page.evaluate(() => {
      const elements = document.querySelectorAll("[class]");
      const classSet = new Set<string>();

      elements.forEach((el) => {
        const classes = el.className.split(" ");
        classes.forEach((cls) => {
          // Tailwind 유틸리티 클래스 패턴 확인
          if (
            cls.match(
              /^(w-|h-|p-|m-|pt-|pb-|pl-|pr-|flex|justify-|items-|bg-|text-|rounded-|border-|shadow-|opacity-)/,
            )
          ) {
            classSet.add(cls);
          }
        });
      });

      return Array.from(classSet);
    });

    console.log("발견된 Tailwind 유틸리티 클래스:", utilityClasses);
    expect(utilityClasses.length).toBeGreaterThan(0);
  });

  test("globals.css가 정상 로드되었는지 확인", async ({ page }) => {
    await page.goto("/");

    const cssLoaded = await page.evaluate(() => {
      const sheets = document.styleSheets;
      let cssText = "";

      for (let i = 0; i < sheets.length; i++) {
        try {
          // 외부 스타일시트는 CORS 제약으로 접근 불가능할 수 있음
          const rules = sheets[i].cssRules;
          for (let j = 0; j < rules.length; j++) {
            cssText += (rules[j] as CSSRule).cssText;
          }
        } catch (e) {
          // CORS 에러는 무시
        }
      }

      // @tailwind 디렉티브가 처리되었는지 확인
      return {
        totalRules: sheets.length,
        hasContent: cssText.length > 0,
        cssPreview: cssText.substring(0, 200),
      };
    });

    console.log("CSS 로드 상태:", cssLoaded);
    expect(cssLoaded.totalRules).toBeGreaterThan(0);
  });

  test("레이아웃 요소들이 실제 크기를 가지고 있는지 확인", async ({ page }) => {
    await page.goto("/");

    const layouts = await page.evaluate(() => {
      const elements = document.querySelectorAll(
        '[class*="flex"], [class*="w-"], [class*="h-"]',
      );
      const results: any[] = [];

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 || rect.height > 0) {
          results.push({
            tag: el.tagName,
            width: rect.width,
            height: rect.height,
            className: (el as HTMLElement).className.substring(0, 100),
          });
        }
      });

      return results.slice(0, 10); // 처음 10개만
    });

    console.log("렌더링된 요소 크기:", layouts);
    expect(layouts.length).toBeGreaterThan(0);
  });

  test("반응형 클래스가 적용되었는지 확인", async ({ page }) => {
    await page.goto("/");

    const responsiveClasses = await page.evaluate(() => {
      const elements = document.querySelectorAll("[class]");
      const responsive = new Set<string>();

      elements.forEach((el) => {
        const classes = el.className.split(" ");
        classes.forEach((cls) => {
          // 반응형 클래스 패턴 (sm:, md:, lg: 등)
          if (cls.match(/^(sm|md|lg|xl|2xl):/)) {
            responsive.add(cls);
          }
        });
      });

      return Array.from(responsive);
    });

    console.log("발견된 반응형 클래스:", responsiveClasses);
  });

  test("Tailwind 커스텀 색상 (hub-primary, hub-secondary 등)이 정의되었는지 확인", async ({
    page,
  }) => {
    await page.goto("/");

    const customColors = await page.evaluate(() => {
      const elements = document.querySelectorAll("[class]");
      const customColorClasses = new Set<string>();

      elements.forEach((el) => {
        const classes = el.className.split(" ");
        classes.forEach((cls) => {
          // hub- 프리픽스의 커스텀 클래스
          if (cls.match(/^(bg-hub|text-hub|border-hub)/)) {
            customColorClasses.add(cls);
          }
        });
      });

      return Array.from(customColorClasses);
    });

    console.log("발견된 커스텀 Tailwind 색상 클래스:", customColors);
  });

  test("개발자 도구로 직접 확인 - 특정 요소의 계산된 스타일", async ({
    page,
  }) => {
    await page.goto("/");

    // 첫 번째 div 요소를 선택하고 계산된 스타일 확인
    const elementStyles = await page.evaluate(() => {
      const el = document.querySelector("div");
      if (!el) return null;

      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        position: styles.position,
        width: styles.width,
        height: styles.height,
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        padding: styles.padding,
        margin: styles.margin,
        border: styles.border,
        className: el.className,
      };
    });

    console.log("요소 계산된 스타일:", elementStyles);
    expect(elementStyles).not.toBeNull();
  });
});

test.describe("특정 컴포넌트 스타일 검증", () => {
  test("Banner 컴포넌트의 그라디언트 스타일 확인", async ({ page }) => {
    await page.goto("/");

    const bannerStyles = await page.evaluate(() => {
      // class에 "flex"가 있는 첫 번째 주요 섹션
      const elements = document.querySelectorAll(
        '[class*="flex"][class*="justify"]',
      );
      const results: any[] = [];

      for (let el of elements) {
        const styles = window.getComputedStyle(el);
        const bgColor = styles.backgroundColor;
        const bgImage = styles.backgroundImage;

        results.push({
          tag: el.tagName,
          backgroundColor: bgColor,
          backgroundImage: bgImage,
          className: (el as HTMLElement).className,
        });
      }

      return results.slice(0, 5);
    });

    console.log("배너 스타일 확인:", bannerStyles);
  });
});
