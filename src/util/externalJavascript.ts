const hoverRepoImage = ( repoClass: string, repoIdx: number ) => {
  const linkHeight: HTMLElement | null = document.getElementById( `link-${ repoClass }-repo-${ repoIdx }` )

  const myImg = document.getElementById( `img-${ repoClass }-repo-${ repoIdx }` ) as HTMLElement
  const LinkHeight = window.getComputedStyle( linkHeight!, null ).getPropertyValue( 'height' )

  myImg.style.transitionDuration = '10s'
  myImg.style.transform = `translateY(calc(-100% + ${ LinkHeight }))`
}

const resetRepoImage = ( repoClassification: string, repoIdx: number ) => {
  const myImg = document.getElementById( `img-${ repoClassification }-repo-${ repoIdx }` ) as HTMLElement

  myImg.style.transitionDuration = '0s'
  myImg.style.transform = 'translateY(-0%)'
}

const repoBackgroundImageUrl = ( data: any, repoIdx: number ) => {
  const httpIndexFinder = data[repoIdx].description.indexOf( 'http' )
  const bgUrlValue = data[repoIdx].description.slice( httpIndexFinder )
  return bgUrlValue
}

export {
  hoverRepoImage,
  resetRepoImage,
  repoBackgroundImageUrl,
}
