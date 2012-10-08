/*global module, exports, window*/(function(){"use strict";function n(e){return/^[a-z0-9]+$/i.test(e)}function r(e){return typeof e!="string"&&typeof e!="number"||!!isNaN(e%1)?!1:!0}function i(e,t,n){return typeof e=="object"||typeof e=="function"||typeof t=="object"||typeof t=="function"||typeof n=="object"||typeof n=="function"?!1:e>=t&&e<=n?!0:!1}function s(e){return typeof e=="boolean"||typeof e=="number"&&(e===0||e===1)?!0:!1}function o(e,t){return typeof t!="boolean"&&(t=!1),t?r(e)&&e%1===0?!0:!1:/^\s*(\+|-)?\d+\s*$/.test(e)}function u(e){var t=e.length,n=0,r=[[0,1,2,3,4,5,6,7,8,9],[0,2,4,6,8,1,3,5,7,9]],i=0;while(t--)i+=r[n][parseInt(e.charAt(t),10)],n^=1;return i%10===0&&i>0}function a(e){if(e&&e.constructor&&e.constructor.toString){var t=e.constructor.toString().match(/function\s*(\w+)/);if(t&&t.length===2)return t[1]}return undefined}function f(e){return typeof e!="string"&&typeof e!="number"?!1:(e=e.replace(/[ \-]/g,""),o(e)?u(e):!1)}function l(e){return a(e)==="Date"?!0:(new Date(e)).toString()!=="Invalid Date"||!isNaN(new Date(e))?!0:!1}function c(e){return r(e)&&e%1!==0?!0:!1}function h(e){return typeof e!="string"?!1:/\S+@\S+/.test(e)}function p(e,t){var n;if(typeof e!="object"||typeof t!="object")return!1;for(n in t)if(t.hasOwnProperty(n)&&typeof e[n]=="undefined")return!1;return!0}function d(e,t){var n;return typeof t!="object"||typeof t.indexOf=="undefined"||typeof e!="string"?!1:(n=e.split(".").pop().toLowerCase(),t.indexOf(n)!==-1?!0:!1)}function v(e){var t=["mp3","ogg","aac","wav"];return d(e,t)}function m(e){var t=["gif","png","jpeg","jpg","svg","bmp"];return d(e,t)}function g(e){var t=["mp4","ogv","m4v","mov","avi"];return d(e,t)}function y(e,t){return typeof t!="object"||typeof t.indexOf=="undefined"?!1:t.indexOf(e)!==-1?!0:!1}function b(e){var t=/^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$|^(([a-zA-Z]|[a-zA-Z][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z]|[A-Za-z][A-Za-z0-9\-]*[A-Za-z0-9])$|^(?:(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){6})(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:::(?:(?:(?:[0-9a-fA-F]{1,4})):){5})(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})))?::(?:(?:(?:[0-9a-fA-F]{1,4})):){4})(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,1}(?:(?:[0-9a-fA-F]{1,4})))?::(?:(?:(?:[0-9a-fA-F]{1,4})):){3})(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,2}(?:(?:[0-9a-fA-F]{1,4})))?::(?:(?:(?:[0-9a-fA-F]{1,4})):){2})(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,3}(?:(?:[0-9a-fA-F]{1,4})))?::(?:(?:[0-9a-fA-F]{1,4})):)(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,4}(?:(?:[0-9a-fA-F]{1,4})))?::)(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9]))\.){3}(?:(?:25[0-5]|(?:[1-9]|1[0-9]|2[0-4])?[0-9])))))))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,5}(?:(?:[0-9a-fA-F]{1,4})))?::)(?:(?:[0-9a-fA-F]{1,4})))|(?:(?:(?:(?:(?:(?:[0-9a-fA-F]{1,4})):){0,6}(?:(?:[0-9a-fA-F]{1,4})))?::))))$/;return t.test(e)}function w(e,t){return(typeof e=="string"||typeof e=="object")&&typeof e.length!="undefined"&&o(t)&&e.length>=t?!0:!1}function E(e,t){return(typeof e=="string"||typeof e=="object")&&typeof e.length!="undefined"&&o(t)&&e.length<=t?!0:!1}function S(e,t){return typeof e!="number"||typeof t!="number"?!1:e%t===0?!0:!1}function x(e,t){return typeof e=="object"&&typeof e.length=="undefined"&&typeof t=="string"&&a(e)===t?!0:!1}function T(e){var t="",n=[];if(typeof e=="string"){t=e.replace(/[^x0-9]/g,""),n=t.split("x");if(n.length>0&&o(n[0])&&(n[0].length===10||n[0].length===11)&&o(n.pop()))return!0}return!1}function N(e){var t="";if(typeof e=="string"){t=e.replace(/[^0-9]/g,"");if(o(t)&&(t.length===5||t.length===9))return!0}return!1}function C(e){var t="";if(typeof e=="string"){t=e.replace(/[^0-9]/g,"");if(o(t)&&t.length===9)return!0}return!1}var e={},t;e.alphaNumeric=n,e.between=i,e.boolean=s,e.cc=f,e.date=l,e.decimal=c,e.email=h,e.extension=p,e.fileExtension=d,e.fileExtensionAudio=v,e.fileExtensionImage=m,e.fileExtensionVideo=g,e.inArray=y,e.int=o,e.ip=b,e.minLength=w,e.maxLength=E,e.multiple=S,e.number=r,e.ofType=x,e.phone=T,e.postal=N,e.ssn=C,t=function(t,n){function r(e,t){typeof t=="object"?this.error_messages=t:this.error_messages={},this.value=e,this.errors=[],this.valid=!0}function i(n){var r=Array.prototype.slice.call(arguments,1);return r.unshift(t),function(){var t=r.concat(Array.prototype.slice.call(arguments)),i=e[n].apply(null,t);return i||(typeof this.error_messages[n]!="undefined"?this.errors.push(this.error_messages[n]):this.errors.push(n),this.errors.push(n),this.valid=!1),this}}for(var s in e)e.hasOwnProperty(s)&&(r.prototype[s]=i(s));return new r(t,n)};for(var k in e)e.hasOwnProperty(k)&&(t[k]=e[k]);typeof exports!="undefined"?(typeof module!="undefined"&&module.exports&&(exports=module.exports=t),exports.iz=t):window.iz=t})();