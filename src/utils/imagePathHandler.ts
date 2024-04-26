const imagePathHandler = (imgPath: string) => {
    if(process.env.REACT_APP_DOCKER){
      return `/${imgPath}`
    }else if(process.env.REACT_APP_NODE_ENV === 'production'){
      return `${window.location.origin}/${process.env.REACT_APP_REPOSITORY}/${imgPath}`
    }
    // By default, including NODE_ENV as 'development'...
    return imgPath
}

export default imagePathHandler;