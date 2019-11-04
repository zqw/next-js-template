import {createGlobalStyle} from "styled-components";
import {rgba} from "./style-utils";

const GlobalStyle = createGlobalStyle`
  * {
    -webkit-touch-callout:none;
    -webkit-user-select:none;
    -khtml-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }
  
  ul {
    margin: 0;
    padding: 0;
  }
  html{
    margin: 0;
    padding: 0;
    font-family: Helvetica,'Microsoft YaHei','Microsoft JhengHei UI','Times New Roman', Times, serif;
    background-color: #2f4159;
  }

  body{
    margin: 0;
    padding: 0;
    font-family: Helvetica,'Microsoft YaHei','Microsoft JhengHei UI','Times New Roman', Times, serif;
    overflow-y: scroll;
    height: 100vh;
    background-color: #2f4159;
  }
  body{
     //用于消除a链接点击后出现的阴影
     -webkit-tap-highlight-color: rgba(0,0,0,0);
     background:red;

  }
  
  .recalc-not-complete{    
    .mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        background-color: #2f4159;
        height: 100vh;
        z-index: 1000;
    }
  }
  
  body * {
      box-sizing: border-box;
    }

    input::-webkit-input-placeholder{
        color:${rgba("#fff", 0.5)};
    }
    
    input::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:${rgba("#fff", 0.5)};
    }
    
    input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color:${rgba("#fff", 0.5)};
    }
    
    input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
        color:${rgba("#fff", 0.5)};
    }
    


`;

export default GlobalStyle;