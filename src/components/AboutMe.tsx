import React from 'react'
import { AboutMeContent } from './Content'
import { SectionTitle } from './Title'
import { graphql, useStaticQuery } from 'gatsby'
import styled, { css } from 'styled-components'
import GatsbyImage from 'gatsby-image'
import { Emoji } from './Emoji'
import { getImageByName } from '@utils/getImageByName'

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
  width: 350px;
  height: auto;
  position: relative;
  border-radius: 4px;
  &::after {
    content: '';
    background: linear-gradient(-90deg, #ffffffee, #ffffffee 15%, #ffffff00);
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
`

const ParagraphContainer = styled.div<{ reversed?: boolean }>`
  display: flex;
  height: 100%;
  align-items: center;
  flex-direction: ${({ reversed }) => reversed ? 'row-reverse' : 'row'};
  justify-content: flex-start;
  ${MainParagraph} {
    margin-left: ${({ reversed }) => reversed ? '0' : '-2rem'};
    margin-right: ${({ reversed }) => reversed ? '-2rem' : '0'};
  }
  ${StyledImage} {
    &::after {
      ${({ reversed }) => reversed 
      ? css`
        background: linear-gradient(90deg, #ffffffee, #ffffffee 15%, #ffffff00);
      ` 
      : css`
        background: linear-gradient(-90deg, #ffffffee, #ffffffee 15%, #ffffff00);
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
  const image2 = getImageByName(images, 'AboutMe2');
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
          After this period of time, I can tell that creating things became my <Bolden>passion</Bolden>.
        </MainParagraph>
      </ParagraphContainer>
      <ParagraphContainer reversed>
        <StyledImage fluid={image2.node.fluid}/>
        <MainParagraph data-initiale='B'>
          Besides coding, I also do like UI/UX concerns, animations stuff drives me crazy, 
          these aspects of my creative soul, improves my details and micro-interactions awareness.
        </MainParagraph>
      </ParagraphContainer>
      <ParagraphContainer>
        <StyledImage fluid={image3.node.fluid}/>
        <MainParagraph data-initiale='B'>
          I am also keen on traveling, meeting new people. 
          I do like learning new languages,
          for now I have chosen Spanish and Brasilian Portuguese to learn.
          On daily basis I spend my free time on Yoga <Emoji label="Man doing yoga emoji">🧘‍♂️</Emoji>,
          Cycling <Emoji label="Bicycle emoji">🚴</Emoji> and a little bit of gaming <Emoji label="Gamepad emoji">🎮</Emoji>
        </MainParagraph>
      </ParagraphContainer>
    </AboutMeContent>
  )
}


