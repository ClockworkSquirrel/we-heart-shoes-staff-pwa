(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{183:function(e,t,a){e.exports=a(275)},275:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(12),i=a.n(o),c=a(13),l=a(44),s=a.n(l),d=a(71);const u=Object(c.b)({store:{},scanOpen:!1,fflags:{},fetchNearestStore:function(){var e=Object(d.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise((e,t)=>{if(!navigator.geolocation)return t("Geolocation API is not supported");navigator.geolocation.getCurrentPosition(e,t,{enableHighAccuracy:!1})}).then(({coords:{latitude:e,longitude:t}})=>({lat:e,lon:t})).then(({lat:e,lon:t})=>fetch("".concat("https://whs-endpoints.glitch.me","/api/locate/?lat=").concat(e,"&lon=").concat(t))).then(e=>e.json()).then(({result:e})=>{u.store={name:e.storeName,id:e.storeId}}).catch(e=>{u.store.error=e.message}));case 1:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()});var m=u,p=a(48),h=a(43),g=a(11),v=a(313),f=a(174),b=a(298),y=a(314),E=a(316),w=a(311),k=a(178),O=a(166),S=a.n(O),x=a(19),j=a(321),C=a(319),N=a(317),z=a(301),W=a(318),T=a(304),I=a(165),R=a.n(I);const B=Object(b.a)(e=>({root:{width:"100%",margin:e.spacing(3,0)},codeInputBox:{borderRadius:e.shape.borderRadius,"& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button":{WebkitAppearance:"none"}}}));var L=Object(c.c)(()=>{const e=Object(n.useState)(),t=Object(x.a)(e,2),a=t[0],o=t[1],i=B(),c=Object(g.f)();return r.a.createElement("div",{className:i.root},r.a.createElement("form",{onSubmit:e=>{e.preventDefault();let t=a.trim().replace(/[^\d]/g,"");t.length-3<5||(t=t.substr(0,t.length-3)),c.push("/product/".concat(t))}},r.a.createElement(j.a,{variant:"filled",fullWidth:!0},r.a.createElement(C.a,{htmlFor:"product-code-search"},"Product code"),r.a.createElement(N.a,{id:"product-code-search",type:"number",min:"10000",max:"999999",endAdornment:r.a.createElement(z.a,{position:"end"},r.a.createElement(W.a,{title:"Scan a barcode",arrow:!0},r.a.createElement(T.a,{"aria-label":"Scan a barcode",edge:"end",onClick:e=>{e.preventDefault(),m.scanOpen=!0}},r.a.createElement(R.a,null)))),disableUnderline:!0,autoComplete:"off",className:i.codeInputBox,onInput:({target:{value:e}})=>o(e)}))))});const P=Object(b.a)(e=>({root:{display:"flex",width:"100%",alignItems:"center",justifyContent:"center",flexDirection:"column"},headerTitle:{fontWeight:e.typography.fontWeightBold,color:e.palette.primary.main,fontSize:"1.71rem"},headerTitleLink:{textDecoration:"none"},headerStoreInfo:{textTransform:"uppercase",fontWeight:e.typography.fontWeightBold,fontSize:"0.85rem",color:e.palette.grey[600]}}));var U=Object(c.c)(()=>{const e=P();return Object(n.useEffect)(()=>{m.fetchNearestStore()},[]),r.a.createElement("header",{className:e.root},r.a.createElement(h.b,{to:"/",className:e.headerTitleLink},r.a.createElement(k.a,{variant:"h4",component:"h1",className:e.headerTitle},"we",r.a.createElement(S.a,null),"shoes")),r.a.createElement(k.a,{variant:"body1",component:"p",className:e.headerStoreInfo},m.store.error?"":m.store.name?"".concat(m.store.name," - ").concat(m.store.id):"Determining Location..."),m.store.name?r.a.createElement(L,null):"")}),D=a(315),M=a(322),G=a(303),H=a(276),q=a(167),A=a.n(q);const F=Object(b.a)(e=>({modalContainer:{padding:e.spacing(2),margin:"".concat(e.spacing(4),"px auto"),maxWidth:500},modalPaper:{outline:0,flexGrow:1,width:"100%",padding:e.spacing(1),borderRadius:2*e.shape.borderRadius,"& video":{marginBottom:e.spacing(-1)+1,borderRadius:e.shape.borderRadius}}}));var K=Object(c.c)(()=>{const e=F(),t=Object(g.f)(),a=()=>m.scanOpen=!1,o=Object(n.useState)(),i=Object(x.a)(o,2),c=i[0],l=i[1];return Object(n.useEffect)(()=>l(null),[m.scanOpen]),Object(n.useEffect)(()=>{"?scan"!==t.location.search||m.scanOpen||(m.scanOpen=!0)}),r.a.createElement(D.a,{open:m.scanOpen,onClose:a,BackdropComponent:M.a,className:e.modalContainer},r.a.createElement(G.a,{in:m.scanOpen},r.a.createElement(H.a,{className:e.modalPaper},r.a.createElement(A.a,{width:"100%",height:"100%",onUpdate:(e,n)=>{var r;if(e||!n)return;const o=(null!==(r=n.text)&&void 0!==r?r:"").trim().replace(/[^\d]/g,""),i=o.length-3<5?o:o.substr(0,o.length-3);if(c===i)return a();l(i),a(),t.push("/product/".concat(i))}}))))}),J=a(305);const _=Object(b.a)(e=>({root:{display:"block",margin:"".concat(e.spacing(3),"px auto")}}));var X=(...e)=>{const t=_();return r.a.createElement(J.a,Object.assign({className:t.root},e))};const Z=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function V(e){if("serviceWorker"in navigator){if(new URL("/we-heart-shoes-staff-pwa",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",()=>{const t="".concat("/we-heart-shoes-staff-pwa","/service-worker.js");Z?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then(a=>{const n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then(e=>{e.unregister().then(()=>{window.location.reload()})}):$(e,t)}).catch(()=>{})}(t,e),navigator.serviceWorker.ready.then(()=>{})):$(t,e)})}}function $(e,t){navigator.serviceWorker.register(e).then(e=>{e.onupdatefound=(()=>{const a=e.installing;null!=a&&(a.onstatechange=(()=>{"installed"===a.state&&(navigator.serviceWorker.controller?t&&t.onUpdate&&t.onUpdate(e):t&&t.onSuccess&&t.onSuccess(e))}))})}).catch(e=>{console.error("Error during service worker registration:",e)})}var Q=()=>{const e=({waiting:e})=>{e.postMessage({type:"SKIP_WAITING"}),window.location.reload()};Object(n.useEffect)(()=>{V({onUpdate:e})},[])},Y=a(93);const ee=JSON.parse(localStorage.getItem("_state")),te=Object(c.b)({data:Object(Y.a)({history:[]},ee),pushHistory:function(){var e=Object(d.a)(s.a.mark(function e(t){var a,n,r,o;return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:n=void 0,e.t0=s.a.keys(te.data.history);case 2:if((e.t1=e.t0()).done){e.next=9;break}if(r=e.t1.value,te.data.history[r].StyleCode!==t.id){e.next=7;break}return n=r,e.abrupt("break",9);case 7:e.next=2;break;case 9:for(o={StyleCode:t.id,Name:t.name,Price:t.price.current,Currency:t.currency,Thumbnail:t.thumbnail,Offers:null!==(a=t.offers)&&void 0!==a?a:[]},void 0===n?te.data.history.unshift(o):(te.data.history[n]=Object(Y.a)(Object(Y.a)({},te.data.history[n]),o),te.data.history.splice(0,0,te.data.history.splice(n,1)[0]));te.data.history.length>"12";)te.data.history.pop();case 12:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}(),clearHistory:function(){var e=Object(d.a)(s.a.mark(function e(){return s.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",te.data.history=[]);case 1:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}()});Object(c.a)(()=>{localStorage.setItem("_state",JSON.stringify(te.data))});var ae=te,ne=a(117),re=a(306),oe=a(307),ie=a(308),ce=a(309),le=a(310);const se=Object(b.a)(e=>({productCard:{backgroundColor:e.palette.grey[300],maxHeight:72},cardRoot:{display:"flex",flexDirection:"row",alignItems:"start"},cardThumb:{height:64,width:64,margin:e.spacing(.5),backgroundColor:"white",borderRadius:.5*e.shape.borderRadius,flexShrink:0,flexGrow:0},cardContent:{flexGrow:1,padding:e.spacing(.5),overflow:"hidden"},cardTitle:{fontSize:"1rem",fontWeight:e.typography.fontWeightBold,width:"100%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},cardStyleCode:{fontSize:"0.71rem",fontWeight:e.typography.fontWeightBold,color:e.palette.grey[600],marginTop:"-0.29rem"},cardOffers:{fontSize:"0.71rem",fontWeight:e.typography.fontWeightBold,color:e.palette.grey[600],marginTop:"-0.29rem"},cardPrice:{fontSize:"1rem",fontWeight:e.typography.fontWeightRegular,marginTop:"auto"},miniInfo:{display:"flex",flexDirection:"row"},flexSpacer:{display:"block",flexGrow:1}}));var de=Object(c.c)(()=>{const e=se();return r.a.createElement(re.a,{container:!0,spacing:1},ae.data.history.map(t=>{var a;return r.a.createElement(re.a,{item:!0,xs:12,key:t.StyleCode},r.a.createElement(oe.a,{elevation:0,className:e.productCard},r.a.createElement(ie.a,{component:h.b,to:"/product/".concat(t.StyleCode),className:e.cardRoot},r.a.createElement(ce.a,{image:t.Thumbnail,title:t.Name,className:e.cardThumb}),r.a.createElement(le.a,{className:e.cardContent},r.a.createElement(k.a,{component:"h5",className:e.cardTitle},t.Name),r.a.createElement("div",{className:e.miniInfo},r.a.createElement(k.a,{variant:"subtitle1",className:e.cardStyleCode},t.StyleCode),r.a.createElement("div",{className:e.flexSpacer}),null===t||void 0===t?void 0:null===(a=t.Offers)||void 0===a?void 0:a.map(t=>{var a;return r.a.createElement(k.a,{variant:"subtitle1",className:e.cardOffers},null!==(a=null===t||void 0===t?void 0:t.abbr)&&void 0!==a?a:null===t||void 0===t?void 0:t.name)})),r.a.createElement(k.a,{variant:"body1",className:e.cardPrice},"EUR"===(null===t||void 0===t?void 0:t.Currency)?"\u20ac":"\xa3",t.Price)))))}))});const ue=Object(b.a)(e=>({historyHeader:{fontWeight:e.typography.fontWeightBold,fontSize:"1rem"},historyClearText:{textTransform:"uppercase",fontWeight:e.typography.fontWeightBold,fontSize:"0.75rem",color:e.palette.grey[600]},historyClearButton:{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"start",clear:"both",marginBottom:e.spacing(1)}}));var me=Object(c.c)(()=>{const e=ue(),t=ae.data.history.length;return r.a.createElement("div",null,r.a.createElement(p.a,{title:"Home"}),t?r.a.createElement(ne.a,{className:e.historyClearButton,onClick:e=>{e.preventDefault(),ae.clearHistory()}},r.a.createElement(k.a,{variant:"h2",className:e.historyHeader},"History"),r.a.createElement(k.a,{variant:"body1",className:e.historyClearText},"Clear ",t.toLocaleString()," item",t>1?"s":"")):"",r.a.createElement(de,null))}),pe=a(320),he=a(312),ge=a(172),ve=a.n(ge),fe=a(173),be=a.n(fe);var ye=(e="",t={})=>{const a=Object(n.useState)({}),r=Object(x.a)(a,2),o=r[0],i=r[1],c=Object(n.useState)(!0),l=Object(x.a)(c,2),s=l[0],d=l[1],u=Object(n.useState)(),m=Object(x.a)(u,2),p=m[0],h=m[1];return Object(n.useEffect)(()=>{d(!0),fetch("".concat("https://whs-endpoints.glitch.me","/api").concat(e),t).then(e=>e.json()).then(({result:e})=>i(e)).catch(e=>{var t;return h(null===(t=e.message)||void 0===t||t)}).finally(()=>d(!1))},[e]),[o,s,p]},Ee=a(175),we=a(4),ke=a(169),Oe=a.n(ke),Se=a(170),xe=a.n(Se),je=a(168),Ce=a.n(je);const Ne=Object(b.a)(e=>({sizeCard:{padding:0,backgroundColor:e.palette.background.default},cardMain:{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"start"},cardSize:{width:55,height:55,display:"flex",flexShrink:0,flexGrow:0,backgroundColor:e.palette.grey[300],alignItems:"center",justifyContent:"center",borderRadius:e.shape.borderRadius,marginLeft:e.spacing(1.5)},cardSizePrimary:{backgroundColor:e.palette.primary.main},cardSizeText:{color:e.palette.getContrastText(e.palette.grey[300]),fontSize:"1.71rem",verticalAlign:"middle",fontWeight:e.typography.fontWeightBold},cardSizeTextPrimary:{color:e.palette.getContrastText(e.palette.primary.main)},cardContent:{flexGrow:1,overflow:"hidden"},storeStockText:{fontSize:e.typography.fontSize,fontWeight:e.typography.fontWeightBold},onlineStockText:{fontSize:e.typography.fontSize,fontWeight:e.typography.fontWeightRegular}})),ze={letter:[{size:"S",equiv:"3-4",gender:"W"},{size:"M",equiv:"5-6",gender:"W"},{size:"L",equiv:"7-8",gender:"W"},{size:"XL",equiv:"9-10",gender:"W"},{size:"S",equiv:"7-8",gender:"M"},{size:"M",equiv:"9-10",gender:"M"},{size:"L",equiv:"11-12",gender:"M"},{size:"XL",equiv:"13-14",gender:"M"}],eu:[{uk:1,eu:21},{uk:2,eu:22},{uk:3,eu:23},{uk:4,eu:24},{uk:5,eu:25},{uk:6,eu:26},{uk:7,eu:27},{uk:8,eu:28},{uk:9,eu:29},{uk:10,eu:30},{uk:11,eu:31},{uk:12,eu:32},{uk:13,eu:33},{uk:1,eu:34},{uk:2,eu:35},{uk:3,eu:36},{uk:4,eu:37},{uk:5,eu:38},{uk:6,eu:39},{uk:7,eu:40},{uk:8,eu:41},{uk:9,eu:42},{uk:10,eu:43},{uk:11,eu:44},{uk:12,eu:45},{uk:13,eu:46},{uk:14,eu:47},{uk:15,eu:48}]};var We=Object(c.c)(({styleCode:e="",size:t={},category:a="",autoCheck:o=!1,useIcon:i=!1})=>{var c,l,s,d,u;const p=Ne(),h=m.store,g=h.id,v=h.name,f=Object(n.useState)(!1),b=Object(x.a)(f,2),y=b[0],E=b[1],w=Object(n.useState)(!1),O=Object(x.a)(w,2),S=O[0],j=O[1],C=Object(n.useState)(!1),N=Object(x.a)(C,2),z=N[0],T=N[1],I=Object(n.useState)(!1),R=Object(x.a)(I,2),B=R[0],L=R[1],P=()=>(T(!0),j(!0),fetch("".concat("https://whs-endpoints.glitch.me","/api/stock/").concat(g,"/").concat(e).concat(t.code)).then(e=>e.json()).then(({result:e})=>{E(null===e||void 0===e?void 0:e.inStock)}).catch(e=>L(e.message)).finally(()=>j(!1))),U=((e="")=>e.replace(/[A-Z]/gi,"").length?Number(e)>15?"EU":"UK":"SML")(t.size),D="EU"===U?"UK Size ".concat(((e="",t="W")=>{var a,n;const r=Math.floor(Number(e)+.5),o=ze.eu.filter(({eu:e})=>e===r);return null!==(a=(null===o||void 0===o?void 0:null===(n=o[0])||void 0===n?void 0:n.uk)-("W"===t?0:1))&&void 0!==a?a:"unavailable"})(t.size,null===a||void 0===a?void 0:null===(c=a[0])||void 0===c?void 0:null===(l=c[0])||void 0===l?void 0:l.toUpperCase())," (est.)"):"UK"===U?"":"UK Size ".concat(((e="",t="W")=>{var a,n,r;return null!==(a=null===(n=ze.letter.filter(({size:a,gender:n})=>a===e.toUpperCase()&&n===t.toUpperCase()))||void 0===n?void 0:null===(r=n[0])||void 0===r?void 0:r.equiv)&&void 0!==a?a:"unavailable"})(t.size,null===a||void 0===a?void 0:null===(s=a[0])||void 0===s?void 0:null===(d=s[0])||void 0===d?void 0:d.toUpperCase())," (est.)");return Object(n.useLayoutEffect)(()=>{o&&P()},[]),r.a.createElement(oe.a,{elevation:0,className:p.sizeCard,key:t.code},r.a.createElement(W.a,{title:D,placement:"top"},r.a.createElement(ie.a,{className:p.cardMain,onClick:e=>{e.preventDefault(),P()}},r.a.createElement("div",{className:Object(we.a)(p.cardSize,{[p.cardSizePrimary]:y})},r.a.createElement(k.a,{variant:"h6",className:Object(we.a)(p.cardSizeText,{[p.cardSizeTextPrimary]:y})},S?r.a.createElement(X,{size:"1.71rem"}):i?z?y?r.a.createElement(Ce.a,null):r.a.createElement(Oe.a,null):r.a.createElement(xe.a,null):t.size)),r.a.createElement(le.a,{className:p.cardContent},r.a.createElement(k.a,{variant:"h6",className:p.storeStockText},B?"An error ocurred":y?"In stock in ".concat(v):S?"Checking the stock room...":z?"Out of stock in ".concat(v):"Tap to check stock in ".concat(v)),r.a.createElement(k.a,{variant:"h6",className:p.onlineStockText},t.stock.warehouse>0?"x".concat(null===(u=t.stock.warehouse)||void 0===u?void 0:u.toLocaleString()," in stock online"):"Out of stock online")))))});var Te=e=>{let t=e.styleCode,a=void 0===t?"":t,n=e.sizeRange,o=void 0===n?[]:n,i=e.category,c=void 0===i?"":i,l=Object(Ee.a)(e,["styleCode","sizeRange","category"]);return r.a.createElement(re.a,Object.assign({container:!0,spacing:.5},l),o.map(e=>r.a.createElement(re.a,{item:!0,xs:12,key:e.code},r.a.createElement(We,{styleCode:a,size:e,category:c,autoCheck:1===o.length,useIcon:1===o.length}))))};const Ie=Object(b.a)(e=>({prodTitle:{fontSize:"1.71rem",textOverflow:"ellipsis",whiteSpace:"nowrap",overflow:"hidden",display:"block"},categoriesContainer:{display:"flex"},catBreadcrumbs:{flexGrow:1},catCrumb:{fontSize:"0.86rem",fontWeight:e.typography.fontWeightBold,color:e.palette.text.disabled},priceText:{fontSize:"1.71rem",fontWeight:e.typography.fontWeightRegular,marginTop:e.spacing(1)},coverImage:{display:"flex",position:"relative",width:"100%",flexDirection:"row",alignItems:"center",justifyContent:"center",overflow:"hidden",borderRadius:e.shape.borderRadius,margin:e.spacing(1,0),border:"1px solid ".concat(e.palette.divider)},productThumb:{width:"100%"},fabCoverImage:{position:"absolute",bottom:e.spacing(2),right:e.spacing(2)},stockSizeContainer:{marginTop:e.spacing(1)},offersContainer:{display:"flex",width:"100%",marginTop:e.spacing(1),alignItems:"end",justifyContent:"flex-end",flexDirection:"row",position:"absolute",top:0,left:0,padding:e.spacing(2,3,0,2)},offerIcon:{width:96,height:96,flexGrow:0,display:"inline-block"},productDescription:{margin:e.spacing(1,0,3)}}));var Re=Object(c.c)(()=>{const e=Ie(),t=Object(g.g)().style,a=ye("/product/".concat(t)),o=Object(x.a)(a,3),i=o[0],c=o[1],l=o[2];return Object(n.useLayoutEffect)(()=>{!c&&!l&&(null===i||void 0===i?void 0:i.name)&&ae.pushHistory(i)}),c?r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{title:"Loading..."}),r.a.createElement(X,null)):l||!(null===i||void 0===i?void 0:i.name)?r.a.createElement(r.a.Fragment,null,r.a.createElement(p.a,{title:"Error"}),r.a.createElement(E.a,{severity:"error"},r.a.createElement(w.a,null,"Error"),l?"".concat(l):(null===i||void 0===i?void 0:i.name)?"Failed to fetch data":r.a.createElement(r.a.Fragment,null,r.a.createElement("strong",null,t)," could not be found"))):r.a.createElement("div",null,r.a.createElement(p.a,{title:null===i||void 0===i?void 0:i.name}),r.a.createElement(k.a,{variant:"h2",className:e.prodTitle},null===i||void 0===i?void 0:i.name),r.a.createElement("div",{className:e.categoriesContainer},r.a.createElement(pe.a,{separator:r.a.createElement(ve.a,{className:e.catCrumb}),className:e.catBreadcrumbs},null===i||void 0===i?void 0:null===(s=i.categories)||void 0===s?void 0:s.map(t=>r.a.createElement(k.a,{className:e.catCrumb},t))),r.a.createElement(k.a,{className:e.catCrumb},null===i||void 0===i?void 0:i.id)),r.a.createElement(k.a,{variant:"body2",className:e.priceText},"GBP"===(null===i||void 0===i?void 0:i.currency)?"\xa3":"\u20ac",null===i||void 0===i?void 0:null===(d=i.price)||void 0===d?void 0:d.current),r.a.createElement("div",{className:e.coverImage},r.a.createElement("div",{className:e.offersContainer},null===i||void 0===i?void 0:null===(u=i.offers)||void 0===u?void 0:u.map(t=>{var a;return r.a.createElement(W.a,{title:"This item is in the ".concat(null!==(a=null===t||void 0===t?void 0:t.abbr)&&void 0!==a?a:null===t||void 0===t?void 0:t.name," offer"),placement:"top"},r.a.createElement("img",{src:null===t||void 0===t?void 0:t.image,alt:null===t||void 0===t?void 0:t.name,className:e.offerIcon}))})),r.a.createElement("img",{src:null===i||void 0===i?void 0:i.thumbnail,alt:null===i||void 0===i?void 0:i.name,className:e.productThumb}),r.a.createElement(W.a,{title:"View on Shoe Zone",placement:"top"},r.a.createElement(he.a,{color:"primary","aria-label":"View on Shoe Zone",className:e.fabCoverImage,component:"a",target:"_blank",href:"https://www.shoezone.com/Products/--".concat(null===i||void 0===i?void 0:i.id)},r.a.createElement(be.a,null)))),r.a.createElement("div",{className:e.productDescription},r.a.createElement(k.a,{variant:"h4",className:e.catCrumb},"Description"),r.a.createElement(k.a,{variant:"body2"},null===i||void 0===i?void 0:i.description)),r.a.createElement(E.a,{severity:"info"},"Hold down a size to see the estimated size conversions for European sizes or S/M/L/XL sizing."),r.a.createElement(Te,{styleCode:null===i||void 0===i?void 0:i.id,sizeRange:null===i||void 0===i?void 0:i.sizeRange,className:e.stockSizeContainer,category:null===(m=i.categories)||void 0===m?void 0:m[0]}));var s,d,u,m});const Be=Object(f.a)({typography:{fontFamily:"Montserrat, Helvetica, Arial, sans-serif"},palette:{primary:{main:"#002F87"}}}),Le=Object(b.a)(e=>({root:{flexGrow:1,overflow:"hidden",padding:e.spacing(2),maxWidth:500,margin:"".concat(e.spacing(1),"px auto")},geoError:{marginTop:e.spacing(2)}}));var Pe=Object(c.c)(()=>{var e,t;const a=Le();return Q(),r.a.createElement("div",null,r.a.createElement(v.a,null),r.a.createElement(p.a,{titleTemplate:"%s - we\u2665shoes",defaultTitle:"we\u2665shoes",title:m.store.error?"Oops!":"Loading..."}),r.a.createElement(y.a,{theme:Be},r.a.createElement("div",{className:a.root},r.a.createElement(h.a,null,r.a.createElement(U,null),m.store.error?r.a.createElement(E.a,{severity:"error",className:a.geoError},r.a.createElement(w.a,null,"Error"),(null===(e=m.store.error)||void 0===e?void 0:null===(t=e.toLowerCase())||void 0===t?void 0:t.indexOf("denied"))>-1?"Please allow location access to use the app.":m.store.error):m.store.name?r.a.createElement(g.c,null,r.a.createElement(g.a,{path:"/",exact:!0,component:me}),r.a.createElement(g.a,{path:"/product/:style",component:Re})):r.a.createElement(X,null),r.a.createElement(K,null)))))});i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Pe,null)),document.querySelector("#app"))}},[[183,1,2]]]);
//# sourceMappingURL=main.7f077828.chunk.js.map