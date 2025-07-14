import styled from "styled-components";

export const SubmitButton = styled.button`
    width: 100%;
    height: 50px,
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: onboardingMutation.isPending ? 'not-allowed' : 'pointer',
    opacity: onboardingMutation.isPending ? 0.7 : 1
`