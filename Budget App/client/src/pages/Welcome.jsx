import React from "react";
import styled, { keyframes, css } from "styled-components";
import useFadeInOnScroll from "../hooks/useFadeInOnScroll";
import { Link } from "react-router-dom";

// ===== Keyframes =====
const fadeInUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const fadeInOpacity = keyframes`
    from {
        transform: translateY(-100%);
        opacity: 0;
    }
    to {
        transform: translateY(0%);
        opacity: 1;
    }
`;

// ===== Animation Wrapper =====
const AnimatedSection = styled.section`
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 1.5s ease, transform 1.5s ease;
    padding: 1rem;

    ${({ $visible }) =>
        $visible &&
        css`
            animation: ${fadeInUp} 1.5s ease forwards;
        `}
`;

// ===== Layout Styles =====
const PageWrapper = styled.div`
    font-family: ${({ theme }) => theme.fonts.main};
    color: ${({ theme }) => theme.colors.text};
`;

const Hero = styled.section`
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${({ theme }) => theme.colors.primary};
    text-align: center;
    font-size: ${({ theme }) => theme.fonts.lg};
    h1 {
        font-family: ${({ theme }) => theme.fonts.heading};
        font-size: 2.5rem;
        margin-bottom: 1rem;
        opacity: 0;
        animation: ${fadeInOpacity} 2s ease-in forwards;
    }
    h3 {
        font-size: 1.125rem;
        margin-bottom: 1.5rem;
        opacity: 0;
        animation: ${fadeInOpacity} 2s ease-in forwards;
        animation-delay: 2s;
    }

    span {
        color: ${({ theme }) => theme.colors.secondary};
    }
`;

const FeatureGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    padding: 4rem 2rem;
`;

const FeatureCard = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);

    h3 {
        margin-bottom: 1rem;
    }

    p {
        color: ${({ theme }) => theme.colors.textLight || "#555"};
    }
`;

const CTA = styled(AnimatedSection)`
    text-align: center;
    padding: 4rem 2rem;
    background: ${({ theme }) => theme.colors.backgroundCTA};

    button {
        padding: 1rem 2rem;
        font-size: 1.2rem;
        border: none;
        border-radius: ${({ theme }) => theme.radius.md};
        background: ${({ theme }) => theme.colors.primary};
        color: white;
        cursor: pointer;
        transition: background 0.3s ease;

        &:hover {
            background: ${({ theme }) => theme.colors.primaryDark};
        }
    }
`;

// ===== Component =====
export default function Welcome() {
    const [heroRef, heroVisible] = useFadeInOnScroll();
    const [featuresRef, featuresVisible] = useFadeInOnScroll();
    const [ctaRef, ctaVisible] = useFadeInOnScroll();

    return (
        <PageWrapper>
            {/* Hero Section */}
            <Hero ref={heroRef} $visible={heroVisible}>
                <h1>Budget Vision</h1>
                <h3>
                    <span>Sharper</span> Insight. <span>Smarter</span> Spending.
                </h3>
            </Hero>

            {/* Features Section */}
            <AnimatedSection ref={featuresRef} $visible={featuresVisible}>
                <h2 style={{ textAlign: "center" }}>What you'll get:</h2>
                <FeatureGrid>
                    <FeatureCard>
                        <h3>Automated Expense Tracking</h3>
                        <p>
                            Upload credit card statements and watch expenses
                            organize themselves.
                        </p>
                    </FeatureCard>
                    <FeatureCard>
                        <h3>Monthly Budget Insights</h3>
                        <p>
                            See exactly where your money is going, and adjust in
                            real-time.
                        </p>
                    </FeatureCard>
                    <FeatureCard>
                        <h3>Custom Categories</h3>
                        <p>
                            Personalize your expense tracking to fit your
                            lifestyle.
                        </p>
                    </FeatureCard>
                </FeatureGrid>
            </AnimatedSection>

            {/* CTA Section */}
            <CTA ref={ctaRef} $visible={ctaVisible}>
                <h2>Get your finances in focus today</h2>
                <Link to="/register">
                    <button>Sign Up Free</button>
                </Link>
            </CTA>
        </PageWrapper>
    );
}
