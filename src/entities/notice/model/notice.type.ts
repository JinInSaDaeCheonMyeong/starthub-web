export interface NoticeParams {
    page: number;
    perPage?: number;
    category?: string; 
    location?: string; 
    target?: string; 
    years?: string; 
    entre?: string; 
    search?: string; 
    returnType?: string; 
  }
  
  export interface NoticeData {
    rcrt_prgs_yn: string; 
    aply_trgt: string; 
    biz_enyy: string;
    biz_trgt_age: string;
    prfn_matr: string; 
    intg_pbanc_yn: string; 
    biz_pbanc_nm: string; 
    intg_pbanc_biz_nm: string; 
    pbanc_ctnt: string; 
    supt_biz_clsfc: string; 
    aply_trgt_ctnt: string; 
    supt_regin: string; 
    pbanc_rcpt_bgng_dt: string; 
    pbanc_rcpt_end_dt: string;
    pbanc_ntrp_nm: string; 
    sprv_inst: string; 
    biz_prch_dprt_nm: string; 
    biz_gdnc_url: string; 
    biz_aply_url: string; 
    prch_cnpl_no: string;
    detl_pg_url: string; 
    aply_mthd_vst_rcpt_istc: string; 
    aply_mthd_pssr_rcpt_istc: string; 
    aply_mthd_fax_rcpt_istc: string; 
    aply_mthd_onli_rcpt_istc: string; 
    aply_mthd_etc_istc: string; 
    aply_excl_trgt_ctnt: string;
    pbanc_sn: string; 
  }
  
  export interface NoticeResponse {
    currentCount: number;
    data: {
      data: NoticeData[];
    };
    matchCount: number;
    page: number;
    perPage: number;
    totalCount: number;
  }