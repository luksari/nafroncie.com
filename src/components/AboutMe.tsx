import React from 'react'
import { AboutMeContent } from './Content'
import { SectionTitle } from './Title'
import { graphql, useStaticQuery } from 'gatsby'
import styled, { css } from 'styled-components'
import GatsbyImage from 'gatsby-image'
import { Emoji } from './Emoji'
import { getImageByName } from '@utils/getImageByName'
import { UISvgAnimation } from './UISvgAnimation'

const PicturesQuery = graphql`
    query PicturesQuery {
      allImageSharp(filter: {fluid: {originalName: {regex: "/About/"}}}) {
        edges {
          node {
            id
            fluid {
              originalName
              aspectRatio
              src
              srcSet
              sizes
              base64
              tracedSVG
              srcWebp
              srcSetWebp
            }
          }
        }
      }
    }
`

const MainParagraph = styled.p`
  width: 33%;
  font-size: 1.2rem;
  z-index: 10;
  position: relative;
  &::after {
    content: attr(data-initiale);
    position: absolute;
    font-size: 5rem;
    left: -1rem;
    top: -3rem;
    opacity: 0.2;
  }
`

const StyledImage = styled(GatsbyImage)`
  width: 100%;
  max-width: 300px;
  max-height: 400px;
  height: auto;
  position: relative;
  border-radius: 4px;
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`

const StyledSVG = styled(UISvgAnimation)`
  max-width: 250px;
  position: relative;
`

const ParagraphContainer = styled.div<{ reversed?: boolean }>`
  display: flex;
  height: 100%;
  max-height: 500px;
  align-items: center;
  flex-direction: ${({ reversed }) => reversed ? 'row-reverse' : 'row'};
  justify-content: flex-start;
  ${MainParagraph} {
    margin-left: ${({ reversed }) => reversed ? '0' : '-2rem'};
    margin-right: ${({ reversed }) => reversed ? '-2rem' : '0'};
  }
  ${StyledImage} {
    &::after {
      ${({ reversed, }) => reversed 
      ? css`
        background: linear-gradient(90deg, #FEF8EDee, #FEF8EDee, 50%, #FEF8ED00);
      ` 
      : css`
        background: linear-gradient(-90deg, #FEF8EDee, #FEF8EDee, 50%, #ffffff00);
      ` 
      }
    }
  }
`



const Bolden = styled.span`
  font-weight: bold;
`

export const AboutMe = () => {
  const images = useStaticQuery(PicturesQuery)

  const image1 = getImageByName(images, 'AboutMe1');
  const image3 = getImageByName(images, 'AboutMe3');
  return (
    <AboutMeContent>
      <SectionTitle>About me</SectionTitle>
      <ParagraphContainer>
      <StyledImage fluid={image1.node.fluid}/>
        <MainParagraph data-initiale='I'>
          I have started learning web development <Bolden>two years ago</Bolden>,
          since then I spend almost <Bolden>every day</Bolden> improving my skills, 
          and learning new usable stuff, to create <Bolden>well produced</Bolden> web applications. 
          After this period of time, I can tell that creating things became my passion.
        </MainParagraph>
      </ParagraphContainer>
      <ParagraphContainer reversed>
        <StyledSVG />
        <MainParagraph data-initiale='B'>
          Besides coding, I also do like <Bolden>UI/UX</Bolden> concerns, <Bolden>animations</Bolden> stuff drives me crazy, 
          these aspects of my creative soul, improves my <Bolden>details and micro-interactions</Bolden> awareness, which results in better products,
          all of these leads to the client who will be happier than ever.
        </MainParagraph>
      </ParagraphContainer>
      <ParagraphContainer>
        <StyledImage fluid={image3.node.fluid}/>
        <MainParagraph data-initiale='I'>
          I am also keen on <Bolden>traveling</Bolden>, meeting new people. 
          I do like learning foreign languages,
          for now I have chosen <Bolden>Spanish</Bolden> and <Bolden>Brasilian Portuguese</Bolden>.
          On daily basis I spend my free time doing <Bolden>gym, yoga, meditation</Bolden> and a little bit of gaming.
          Sometimes I crawl through many creative events around Silesian area, to enjoy talks with people, <Bolden>cold craft beer</Bolden> and various types of <Bolden>pizza</Bolden>
        </MainParagraph>
      </ParagraphContainer>
    </AboutMeContent>
  )
}


