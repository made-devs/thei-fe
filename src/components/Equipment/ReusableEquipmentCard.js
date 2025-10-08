import React from "react";
import styled from "styled-components";
import Link from "next/link";

const ReusableEquipmentCard = ({
  title,
  description,
  image,
  badge,
  ctaText,
  ctaLink,
  footer,
  icon,
}) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="content">
          {/* Back Side */}
          <div className="back">
            <div className="back-content">
              {icon}
              <strong>{title}</strong>
            </div>
          </div>
          {/* Front Side */}
          <div className="front">
            <div className="img">
              {/* Gambar utama */}
              {image && (
                <img
                  src={image}
                  alt={title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 5,
                  }}
                />
              )}
              <div className="circle"></div>
              <div className="circle" id="right"></div>
              <div className="circle" id="bottom"></div>
            </div>
            <div className="front-content">
              {badge && <small className="badge">{badge}</small>}
              <div className="description">
                <div className="title">
                  <p className="title">
                    <strong>{title}</strong>
                  </p>
                </div>
                <p className="card-footer">{description}</p>
                {footer && <div className="card-footer">{footer}</div>}
                {ctaText && ctaLink && (
                  <Link
                    href={ctaLink}
                    className="mt-2 inline-block px-4 py-2 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-colors text-center w-full"
                  >
                    {ctaText}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    overflow: visible;
    width: 220px;
    height: 300px;
    position: relative;
  }

  .content {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: transform 300ms;
    box-shadow: 0px 0px 10px 1px #000000ee;
    border-radius: 5px;
    position: relative;
  }

  .front,
  .back {
    background-color: #151515;
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 5px;
    overflow: hidden;
  }

  .back {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .back::before {
    position: absolute;
    content: " ";
    display: block;
    width: 160px;
    height: 160%;
    background: linear-gradient(
      90deg,
      transparent,
      #ff9966,
      #ff9966,
      #ff9966,
      #ff9966,
      transparent
    );
    animation: rotation_481 5000ms infinite linear;
  }

  .back-content {
    position: absolute;
    width: 99%;
    height: 99%;
    background-color: #151515;
    border-radius: 5px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
  }

  .card:hover .content {
    transform: rotateY(180deg);
  }

  @keyframes rotation_481 {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }

  .front {
    transform: rotateY(180deg);
    color: white;
  }

  .front .front-content {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .front-content .badge {
    background-color: #00000055;
    padding: 2px 10px;
    border-radius: 10px;
    backdrop-filter: blur(2px);
    width: fit-content;
  }

  .description {
    box-shadow: 0px 0px 10px 5px #00000088;
    width: 100%;
    padding: 10px;
    background-color: #00000099;
    backdrop-filter: blur(5px);
    border-radius: 5px;
  }

  .title {
    font-size: 13px;
    max-width: 100%;
    display: flex;
    justify-content: space-between;
  }

  .title p {
    width: 70%;
  }

  .card-footer {
    color: #ffffff88;
    margin-top: 5px;
    font-size: 10px;
  }

  .front .img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .circle {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    background-color: #ffbb66;
    position: relative;
    filter: blur(15px);
    animation: floating 2600ms infinite linear;
  }

  #bottom {
    background-color: #ff8866;
    left: 50px;
    top: 0px;
    width: 150px;
    height: 150px;
    animation-delay: -800ms;
  }

  #right {
    background-color: #ff2233;
    left: 160px;
    top: -80px;
    width: 30px;
    height: 30px;
    animation-delay: -1800ms;
  }

  @keyframes floating {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(10px);
    }
    100% {
      transform: translateY(0px);
    }
  }
`;

export default ReusableEquipmentCard;
