(this["webpackJsonptodolist-ts"]=this["webpackJsonptodolist-ts"]||[]).push([[0],{107:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),i=a(23),l=a.n(i),r=(a(96),a(97),a(72)),c=a.n(r),d=a(12),s=a(166),u=a(171),m=function(e){var t=Object(n.useState)(""),a=Object(d.a)(t,2),i=a[0],l=a[1],r=Object(n.useState)(null),c=Object(d.a)(r,2),m=c[0],p=c[1],b=function(){i.trim()?e.addItem(i):p("Title is required"),l("")};return o.a.createElement("div",null,o.a.createElement(s.a,{variant:"outlined",value:i,onChange:function(e){l(e.currentTarget.value),m&&p(null)},onKeyPress:function(e){"Enter"===e.key&&b()},error:!!m,label:m?"Title is required":"Title",style:{color:"white"}}),o.a.createElement(u.a,{variant:"contained",style:{maxWidth:"30px",maxHeight:"30px",minWidth:"30px",minHeight:"30px"},onClick:b,disabled:null!==m&&!0},"+"))};var p,b=function(e){var t=Object(n.useState)(!1),a=Object(d.a)(t,2),i=a[0],l=a[1],r=Object(n.useState)(e.title),c=Object(d.a)(r,2),u=c[0],m=c[1],p=function(){l(!1),e.onChangeTitle(u)};return i?o.a.createElement(s.a,{color:"secondary",variant:"standard",value:u,onChange:function(e){m(e.currentTarget.value)},onBlur:p,onKeyDown:function(e){"Enter"===e.key&&p()},autoFocus:!0}):o.a.createElement("span",{onDoubleClick:function(){l(!0),m(e.title)}},e.title)},O=a(168),f=a(176),E=a(162),T=a(163),y=a(14),j=a(16),k=a(4),v=a(169),I="all",D=Object(v.a)(),h=Object(v.a)(),_=[{id:D,title:"Learn in Front End",filter:I},{id:h,title:"New skills",filter:I}],g=(p={},Object(k.a)(p,D,[{id:Object(v.a)(),taskTitle:"HTML&CSS",isDone:!0},{id:Object(v.a)(),taskTitle:"JS",isDone:!0},{id:Object(v.a)(),taskTitle:"React",isDone:!0},{id:Object(v.a)(),taskTitle:"Storybook",isDone:!1},{id:Object(v.a)(),taskTitle:"Git",isDone:!1},{id:Object(v.a)(),taskTitle:"Routing",isDone:!1}]),Object(k.a)(p,h,[{id:Object(v.a)(),taskTitle:"Advanced open water diving",isDone:!0},{id:Object(v.a)(),taskTitle:"Ride a car",isDone:!0},{id:Object(v.a)(),taskTitle:"Ride a motorbike",isDone:!1}]),p),S=a(30),A=function(e){var t=e.todolist,a=t.title,n=t.id,i=t.filter,l=Object(S.b)(),r=Object(S.c)((function(e){return e.tasks[n]})),d=function(e){return function(){return l(function(e,t){return{type:"CHANGE_FILTER",payload:{todolistId:e,filter:t}}}(n,e))}},s=r;switch(i){case"active":s=r.filter((function(e){return!e.isDone}));break;case"completed":s=r.filter((function(e){return e.isDone}))}var p=r.length?s.map((function(e){return o.a.createElement("div",{key:e.id,className:"".concat(e.isDone&&c.a.isDone)},o.a.createElement(O.a,{style:{color:"#c7f774"},checked:e.isDone,onChange:function(t){l(function(e,t,a){return{type:"CHANGE_TASK_STATUS",payload:{todolistId:e,taskId:t,isDone:a}}}(n,e.id,t.currentTarget.checked))}}),o.a.createElement(b,{title:e.taskTitle,onChangeTitle:function(t){l(function(e,t,a){return{type:"CHANGE_TASK_TITLE",payload:{todolistId:e,taskId:t,taskTitle:a}}}(n,e.id,t))}}),o.a.createElement(f.a,{"aria-label":"delete",onClick:function(){l(function(e,t){return{type:"REMOVE_TASK",payload:{todolistId:e,taskId:t}}}(n,e.id))}},o.a.createElement(E.a,{style:{color:"#6b7d84"},fontSize:"small"})))})):o.a.createElement("span",null,"Your task list is empty");return o.a.createElement("div",null,o.a.createElement("h3",null,o.a.createElement(b,{title:a,onChangeTitle:function(e){l(function(e,t){return{type:"CHANGE_TODOLIST_TITLE",payload:{todolistId:e,title:t}}}(n,e)),console.log(e)}}),o.a.createElement(f.a,{"aria-label":"delete",onClick:function(){l(function(e){return{type:"REMOVE_TODOLISTID",payload:{todolistId:e}}}(n))}},o.a.createElement(T.a,{style:{color:"#6b7d84"}}))),o.a.createElement("div",null,o.a.createElement(m,{addItem:function(e){l(function(e,t){return{type:"ADD_TASK",payload:{todolistId:e,taskTitle:t}}}(n,e))}})),o.a.createElement("div",null,p),o.a.createElement("div",null,o.a.createElement(u.a,{variant:"".concat(i===I?"contained":"text"),onClick:d(I)},"All"),o.a.createElement(u.a,{variant:"".concat("active"===i?"contained":"text"),onClick:d("active"),color:"secondary"},"Active"),o.a.createElement(u.a,{variant:"".concat("completed"===i?"contained":"text"),onClick:d("completed"),size:"small",color:"success"},"Completed")),o.a.createElement("div",null))},C=a(178),w=a(177),L=a(179),x=a(180),G=a(78),N=a.n(G);var H=function(){return n.createElement(w.a,{sx:{flexGrow:1}},n.createElement(C.a,{position:"static",style:{backgroundColor:"#66b1d1"}},n.createElement(L.a,null,n.createElement(f.a,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2}},n.createElement(N.a,null)),n.createElement(x.a,{variant:"h6",component:"div",sx:{flexGrow:1}},"Todolist"),n.createElement(u.a,{color:"inherit"},"Login"))))},R=a(172),K=a(173),M=a(175);var V=function(){var e=Object(S.b)(),t=Object(S.c)((function(e){return e.todolists}));return o.a.createElement("div",{className:"App"},o.a.createElement(H,null),o.a.createElement(R.a,{fixed:!0},o.a.createElement(K.a,{container:!0,style:{padding:"20px"}},o.a.createElement(m,{addItem:function(t){e(function(e){return{type:"ADD_TODOLIST",payload:{newTodolistId:Object(v.a)(),title:e}}}(t))}})),o.a.createElement(K.a,{container:!0,spacing:3},t.map((function(e){return o.a.createElement(K.a,{item:!0,key:e.id},o.a.createElement(M.a,{style:{padding:"20px",width:"300px"}},o.a.createElement(A,{todolist:e})))})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var W=a(79),B=a(174),F=a(165),J=a(64),z=Object(J.a)({todolists:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"CHANGE_TODOLIST_TITLE":return e.map((function(e){return e.id===t.payload.todolistId?Object(j.a)(Object(j.a)({},e),{},{title:t.payload.title}):e}));case"CHANGE_FILTER":return e.map((function(e){return e.id===t.payload.todolistId?Object(j.a)(Object(j.a)({},e),{},{filter:t.payload.filter}):e}));case"REMOVE_TODOLISTID":return e.filter((function(e){return e.id!==t.payload.todolistId}));case"ADD_TODOLIST":return[{id:t.payload.newTodolistId,title:t.payload.title,filter:I}].concat(Object(y.a)(e));default:return e}},tasks:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:g,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"REMOVE_TASK":return Object(j.a)(Object(j.a)({},e),{},Object(k.a)({},t.payload.todolistId,e[t.payload.todolistId].filter((function(e){return e.id!==t.payload.taskId}))));case"CHANGE_TASK_STATUS":return Object(j.a)(Object(j.a)({},e),{},Object(k.a)({},t.payload.todolistId,e[t.payload.todolistId].map((function(e){return e.id===t.payload.taskId?Object(j.a)(Object(j.a)({},e),{},{isDone:t.payload.isDone}):e}))));case"CHANGE_TASK_TITLE":return Object(j.a)(Object(j.a)({},e),{},Object(k.a)({},t.payload.todolistId,e[t.payload.todolistId].map((function(e){return e.id===t.payload.taskId?Object(j.a)(Object(j.a)({},e),{},{taskTitle:t.payload.taskTitle}):e}))));case"ADD_TASK":var a={id:Object(v.a)(),taskTitle:t.payload.taskTitle,isDone:!1};return Object(j.a)(Object(j.a)({},e),{},Object(k.a)({},t.payload.todolistId,[a].concat(Object(y.a)(e[t.payload.todolistId]))));case"ADD_TODOLIST":return Object(j.a)(Object(k.a)({},t.payload.newTodolistId,[]),e);case"REMOVE_TODOLISTID":var n=Object(j.a)({},e);return delete n[t.payload.todolistId],n;default:return e}}}),Y=Object(J.b)(z);window.store=Y;var q=a(80),U=Object(W.a)({palette:{primary:{main:"#66b1d1"},secondary:{main:"#9999ff"},success:{main:"#c7f774"},mode:"dark",background:{default:"#242e41",paper:"#2e3b52"}}});l.a.render(o.a.createElement(q.a,null,o.a.createElement(S.a,{store:Y},o.a.createElement(B.a,{theme:U},o.a.createElement(F.a,null),o.a.createElement(V,null)))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},72:function(e,t,a){e.exports={errorMessage:"TodoList_errorMessage__3tfYY",error:"TodoList_error__2LNBJ",isDone:"TodoList_isDone__3nSGs",button:"TodoList_button__31WtO"}},91:function(e,t,a){e.exports=a(107)},96:function(e,t,a){},97:function(e,t,a){}},[[91,1,2]]]);
//# sourceMappingURL=main.7f3129a4.chunk.js.map