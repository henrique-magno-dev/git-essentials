'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Tilt from 'react-parallax-tilt'
import './LastProjects.css'
import { useWindowSize } from 'react-use'
import { hoverRepoImage, resetRepoImage, repoBackgroundImageUrl } from '@/util/externalJavascript'

const MainProjects = () => {
  const { width: windowWidth } = useWindowSize()
  const [dataLastRepos, setData] = useState<Array<any>>( [] )

  useEffect( () => {
    fetch( 'https://api.github.com/users/henrique-magno-dev/repos', {
      headers: {
        Authorization: `Bearer ${ process.env.NEXT_PUBLIC_TOKEN_GIT }`,
      },
    } )
      .then( ( res ) => res.json() )
      .then( ( dataFetch ) => setData( dataFetch ) )
  }, [] )

  const description = ( repoIdx: any ) => {
    const repoDesc = dataLastRepos[repoIdx].description.slice( 0, dataLastRepos[repoIdx].description.indexOf( 'http' ) )
    if ( windowWidth >= 1285 ) { return repoDesc.slice( 0, 130 ) }
    if ( windowWidth >= 1024 ) { return repoDesc.slice( 0, 70 ) }
    return ''
  }

  return (
    <>
      {dataLastRepos.map( ( projeto, repoIdx ) => {
        if ( dataLastRepos[repoIdx].stargazers_count !== '0' ) {
          return (
            <div key={`last-projects-${ dataLastRepos[repoIdx].name }`}>
              <Tilt
                glareEnable
                tiltMaxAngleX={5}
                tiltMaxAngleY={windowWidth >= 768 ? 5 : 25}
                perspective={1000}
                glareMaxOpacity={0.1}
                glareColor='#EBEAF0'
                glareReverse
                glareBorderRadius='1.5rem'
              >
                <div
                  key={`last-projects-${ projeto }`}
                  className='projectBoxClass bg-[#0819416c] backdrop-blur-sm relative rounded-3xl border border-gray-800 p-4 lg:h-80  lg:p-4 '
                >
                  <div className='flex items-center justify-center text-2xl font-black capitalize sm:mt-3 sm:text-center sm:text-xl md:mb-2 lg:h-1/6'>
                    {dataLastRepos[repoIdx].name.replace( '-hm', '' ).replace( '-', ' ' )}
                  </div>
                  <div className='flex sm:flex-col md:flex-col lg:h-4/5 lg:flex-row'>
                    <div className=' box-border sm:h-1/2 sm:w-full sm:px-10 sm:py-1 md:h-1/2 md:w-full md:py-2  lg:flex lg:h-full lg:w-1/2 lg:items-center lg:justify-center'>
                      <div className='rounded-3xl border border-gray-800 bg-black sm:m-auto sm:hidden sm:aspect-video sm:w-full md:m-auto md:aspect-video md:h-full lg:aspect-square lg:h-[90%]'>
                        <Link
                          href={`${ dataLastRepos[repoIdx].homepage }`}
                          id={`link-last-repo-${ repoIdx }`}
                          onMouseOver={() => { hoverRepoImage( 'last', repoIdx ) }}
                          onMouseOut={() => { resetRepoImage( 'last', repoIdx ) }}
                          className=' relative flex h-full w-full items-center justify-center overflow-y-hidden rounded-3xl'
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            id={`img-last-repo-${ repoIdx }`}
                            src={repoBackgroundImageUrl( dataLastRepos, repoIdx )}
                            alt='Project Background'
                            className='absolute text-gray-600 top-0 flex items-center justify-center ease-in-out'
                          />
                        </Link>
                      </div>
                    </div>
                    <div className='sm:mt-3 sm:h-auto lg:w-1/2 lg:pl-2 '>
                      <div className=' lg:h-4/5'>
                        {
                          windowWidth >= 600
                            ? (
                              <div className='md:mt-1 lg:h-2/5 '>
                                <div
                                  tabIndex={0}
                                  className=' collapse rounded-3xl border-2  border-green-600 bg-[#040C15] text-white md:collapse-arrow lg:collapse-arrow  sm:text-center '
                                >
                                  <div className='text-medium text-white-400 collapse-title font-thin sm:px-0'>Recursos</div>
                                  <div className='collapse-content'>
                                    {dataLastRepos[repoIdx].topics.map( ( topic: Array<string> ) => (
                                      <div key={`badge-lastP-${ topic }`} className='badge ml-1 border-gray-800 bg-gray-600 text-white'>
                                        #{topic}
                                      </div>
                                    ) )}
                                  </div>
                                </div>
                              </div>
                            )
                            : ''
                        }
                        <div className=' lg:h-2/5 font-thin text-xs mt-2'>{description( repoIdx )}</div>
                        <div className='flex sm:mt-5  md:mt-5  md:h-1/5 lg:h-auto'>
                          <Link
                            href={`${ dataLastRepos[repoIdx].html_url }`}
                            className='mr-2 h-full w-1/2 rounded-2xl  border border-blue-600 bg-blue-600 bg-opacity-5 text-center font-black text-blue-600 duration-500 hover:bg-opacity-10 sm:w-full sm:py-3 md:py-3'
                          >
                            Code
                          </Link>
                          <Link
                            href={`${ dataLastRepos[repoIdx].homepage }`}
                            className='h-full w-1/2 rounded-2xl border  border-green-600 bg-green-600 bg-opacity-5 text-center font-black text-green-600 duration-500 hover:bg-opacity-10 sm:w-full sm:py-3 md:py-3'
                          >
                            Demo
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tilt>
            </div>
          )
        }
        return null
      } )}
    </>
  )
}

export default MainProjects

// describe('MainProjects component', () => {
//   beforeEach(() => {
//     cy.visit('/main-projects') // substitua a URL pela rota onde o componente é renderizado
//   })
//
//   it('should render the component correctly', () => {
//     cy.get('.projectBoxClass').should('have.length.greaterThan', 0)
//     cy.get('.projectBoxClass .projectTitle').should('be.visible')
//     cy.get('.projectBoxClass .projectImg').should('be.visible')
//     cy.get('.projectBoxClass .projectTags').should('be.visible')
//   })
//
//   it('should fetch data from GitHub API', () => {
//     cy.intercept('https://api.github.com/users/henrique-magno-dev/repos').as('githubApi')
//     cy.wait('@githubApi').its('response.statusCode').should('equal', 200)
//     cy.get('.projectBoxClass').should('have.length.greaterThan', 0)
//   })
// })
