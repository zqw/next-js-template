import Document, {Head, Main, NextScript} from "next/document";
import {ServerStyleSheet} from "styled-components";
import "../styles/global-styles";
import React from "react";
import UglifyJS from "uglify-js";
import cdn from "../utils/cdn"

let recalcScript = `
    // <!--关于class的功能函数-->
    function hasClass(obj, cls) {
        return obj.className.match(new RegExp('(\\\\s|^)' + cls + '(\\\\s|$)'));
    }
    
    function addClass(obj, cls) {
        if (!this.hasClass(obj, cls)) obj.className += " " + cls;
    }
    
    function removeClass(obj, cls) {
        if (hasClass(obj, cls)) {
            var reg = new RegExp('(\\\\s|^)' + cls + '(\\\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    }
    
    //--------------------------------------------------
    //isrecalcDone并非无用参数，在其它页面中有使用，勿删！！！
    //--------------------------------------------------
    var isrecalcDone = false;
    var ps1 = 1080;
    var ps2 = 1920;  //横屏
    
    (function (doc, win) {
        var timerId = undefined;
        var lastWindowWidth = undefined;
        var docEl = doc.documentElement;
    
        // <!--横竖屏判断-->
        function isPortrait() {
            var w = document.documentElement.clientWidth;
            var h = document.documentElement.clientHeight;
            return (h > w);
        }
    
        function isLandscape() {
            var w = doc.documentElement.clientWidth;
            var h = doc.documentElement.clientHeight;
            return (w > h);
        }
    
        var recalc = function () {
            if (timerId) {
                clearTimeout(timerId);
                timerId = undefined;
            }
            timerId = setTimeout(function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) return;
    
                //添加一个判断，如果上次的宽度与这次的一样，不再重新设置
                if (lastWindowWidth !== undefined && parseInt(lastWindowWidth) > 0 && clientWidth === lastWindowWidth) {
                    isrecalcDone = true;
                    removeClass(document.body, "recalc-not-complete");
                    return;
                }
    
                lastWindowWidth = clientWidth;
    
                //判断横屏竖屏
                if (isPortrait()) {
                    //如果是竖屏
                    docEl.style.fontSize = 100.00 * clientWidth / ps1 + 'px';
                }
                else {
                    //如果是横屏
                    docEl.style.fontSize = 100.00 * clientWidth / ps2 + 'px';
                }
    
    
                if (!isrecalcDone) {
                    isrecalcDone = true;
                }
    
                removeClass(document.body, "recalc-not-complete");
            }, 300)
    
    
        };
        recalc();
        if (!doc.addEventListener) return;
        if ('orientationchange' in window) {
            win.addEventListener("orientationchange", recalc, false);
        }
        else {
            win.addEventListener("resize", recalc, false);
        }
    
        doc.addEventListener('DOMContentLoaded', recalc, false);
    
        setTimeout(function () {
            recalc(true);
        }, 3000)
    })(document, window);
`;

let phoneInjectScript = `
    function phoneGoBack() {
        if (window.phone && typeof window.phone.close === "function") {
            phone.close();
        }
        else {
            console.log("go back to app");
        }
    }
    
    function phoneGetData(key, defaultValue) {
        if (window.phone && typeof window.phone.getData === "function") {
            return phone.getData(key, defaultValue)
        }
        else {
            var value = localStorage.getItem(key);
            if (value === undefined) {
                return defaultValue
            }
    
            return value;
        }
    }
    
    function phoneSetData(key, value) {
        if (window.phone && typeof window.phone.setData === "function") {
            phone.setData(key, value);
        }
        else {
            localStorage.setItem(key, value);
        }
    }
`;

let initHtmlStyle = {};
export default class SiteDocument extends Document {
  static async getInitialProps(ctx) {
    if (ctx && ctx.req && ctx.req.query && ctx.req.query.initfontsize) {
      // 如果是后端
      initHtmlStyle = {
        fontSize: ctx.req.query.initfontsize
      };
    }
    const initialProps = await Document.getInitialProps(ctx);
    return {...initialProps};
  }

  render() {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main/>);
    const styleTags = sheet.getStyleElement();

    return (
      <html style={initHtmlStyle}>
      <Head>
        <meta charSet="utf-8"/>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
        <link
          href={cdn() + "/static/imgs/favicon.ico"}
          rel="shortcut icon"
          type="image/vnd.microsoft.icon"
        />
        {styleTags}
        {/*<script*/}
        {/*type="text/javascript"*/}
        {/*dangerouslySetInnerHTML={{*/}
        {/*__html: UglifyJS.minify(recalcScript).code*/}
        {/*}}*/}
        {/*/>*/}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: UglifyJS.minify(phoneInjectScript).code
          }}
        />
      </Head>
      <body className="recalc-not-complete">
      <div className="mask"/>
      <div className="root">{main}</div>
      <NextScript/>
      </body>
      </html>
    );
  }
}
