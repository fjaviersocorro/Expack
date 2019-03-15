import logMessage from "./js/logger";
import "./css/style.css"

//Log message to console
logMessage('Expacktacular')
if(typeof(module.hot)!== 'undefined'){
    module.hot.accept() //eslint-disable-line no-undef
}