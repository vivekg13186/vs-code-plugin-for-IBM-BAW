import{au as y,av as P,aw as _,ax as h,aB as $,ay as c,aC as o,aA as a,aF as b,aD as C,az as w,aJ as J,aE as f,aG as s,aH as F,ak as G,ar as z,aq as U,as as q,ap as H,ao as L,an as K,at as Q,al as W,am as X,aN as Y,aO as Z,aI as R}from"./_plugin-vue_export-helper.js";import{C as V}from"./CollapsePanel.js";const ee="added",te="removed",ne="updated";function N(e){return JSON.parse(JSON.stringify(e))}function B(e,n){if(!e&&!n)return null;e=e||[],n=n||[],e=N(e),n=N(n);let r={},p={};e.map(t=>{r[t.id]=t}),n.map(t=>{p[t.id]=t});var m=n.filter(t=>!r[t.id]).map(t=>(t.mode=ee,t)),l=e.filter(t=>!p[t.id]).map(t=>(t.mode=te,t)),d=n.filter(t=>r[t.id]);d.map(t=>{var i=r[t.id];t.value!==i.value?(t.mode=ne,t.name=`${t.projectName} (${i.snapshotName} -> ${t.snapshotName})`,t.oldValue=i.value):t._children=B(i._children,t._children)});var u=m.concat(l).concat(d);return u}var D=function(e){var n={};return n.id=e.projectId,n.value=e.snapshotId,n.projectName=e.projectName,n.snapshotName=e.snapshotName,n.name=`${e.projectName} (${e.snapshotName})`,n._children=null,e.projectDep&&e.projectDeps.length>0&&(n._children=e.projectDep.map(D)),n};const ae={props:["old","nu"],data(){return{tablulator:null,tableData:[]}},mounted(){var e=this.old.map(D),n=this.old.map(D),r=B(e,n);this.tableData.splice(0,0,...r),this.tabulator=new P(this.$refs.table,{data:this.tableData,dataTree:!0,dataTreeStartExpanded:!1,height:"500px",columns:[{title:"Toolkits",field:"name",width:500},{title:"Action",field:"mode"}]})}},oe={ref:"table"};function de(e,n,r,p,m,l){return _(),h("div",null,[$("div",oe,null,512)])}const re=y(ae,[["render",de]]);const se={components:{CollapsePanel:V},props:["teambinding"],methods:{icon(e){return e.type=="user"?"codicon-person":"codicon-organization"}},computed:{title(){var e=this.teambinding;return e.mode?`${e.name} (${e.mode})`:e.name}}},ce={style:{"padding-left":"12px"}},le={class:"row"},_e={class:"row"};function ie(e,n,r,p,m,l){const d=c("vscode-data-grid-cell"),u=c("vscode-data-grid-row"),t=c("vscode-data-grid"),i=c("collapse-panel"),v=c("vscode-divider");return _(),h("div",null,[o(i,{title:l.title},{default:a(()=>[$("div",ce,[o(t,null,{default:a(()=>[(_(!0),h(b,null,C(r.teambinding._children,g=>(_(),w(u,{key:g.id},{default:a(()=>[o(d,{"grid-column":"1"},{default:a(()=>[$("div",le,[$("div",{class:J(["codicon",l.icon(g)])},null,2),$("div",null,f(g.name),1)])]),_:2},1024),o(d,{"grid-column":"2"},{default:a(()=>[$("div",_e,[$("div",null,f(g.mode),1)])]),_:2},1024)]),_:2},1024))),128))]),_:1})])]),_:1},8,["title"]),o(v)])}const ue=y(se,[["render",ie]]),me="added",pe="removed",ve="updated";function x(e){return JSON.parse(JSON.stringify(e))}function k(e,n){if(!e&&!n)return null;e=e||[],n=n||[],e=x(e),n=x(n);let r={},p={};e.map(t=>{r[t.id]=t}),n.map(t=>{p[t.id]=t});var m=n.filter(t=>!r[t.id]).map(t=>(t.mode=me,t)),l=e.filter(t=>!p[t.id]).map(t=>(t.mode=pe,t)),d=n.filter(t=>r[t.id]);d.map(t=>{var i=r[t.id];t.value!==i.value?(t.mode=ve,t.oldValue=i.value):t._children=k(i._children,t._children)});var u=m.concat(l).concat(d);return u}function S(e,n){return e?e.map(r=>({name:r,value:r,type:n,id:r})):[]}function T(e){var n=S(e.group_members,"user").concat(S(e.group_members,"group"));return{id:e.participant_id,name:e.name,value:e.participant_id,_children:n}}function fe(e,n){var r=e.map(T),p=n.map(T);return k(r,p)}const he={components:{CompareTeamBindingView:ue},props:["nu","old"],data(){return{values:[]}},mounted(){this.values.splice(0,0,...fe(this.old,this.nu))}},ge={style:{"min-width":"100%"}};function we(e,n,r,p,m,l){const d=c("compare-team-binding-view");return _(),h("div",ge,[(_(!0),h(b,null,C(m.values,u=>(_(),w(d,{teambinding:u,key:u.id},null,8,["teambinding"]))),128))])}const $e=y(he,[["render",we]]);function E(e){return e=e||[],e.map(n=>(n.id=n.name,n))}const ye={props:["old","nu"],data(){return{values:[]}},mounted(){var e=E(this.old),n=E(this.nu);this.values.splice(0,0,...k(e,n))}},be=s(" Name "),Ce=s(" Current Value "),ke=s(" Change "),De=s(" Old Value ");function Ve(e,n,r,p,m,l){const d=c("vscode-data-grid-cell"),u=c("vscode-data-grid-row"),t=c("vscode-data-grid");return _(),h("div",null,[o(t,null,{default:a(()=>[o(u,{"row-type":"header"},{default:a(()=>[o(d,{"row-type":"columnheader","grid-column":"1"},{default:a(()=>[be]),_:1}),o(d,{"row-type":"columnheader","grid-column":"2"},{default:a(()=>[Ce]),_:1}),o(d,{"row-type":"columnheader","grid-column":"3"},{default:a(()=>[ke]),_:1}),o(d,{"row-type":"columnheader","grid-column":"4"},{default:a(()=>[De]),_:1})]),_:1}),(_(!0),h(b,null,C(m.values,i=>(_(),w(u,{key:i.name},{default:a(()=>[o(d,{"grid-column":"1"},{default:a(()=>[s(f(i.name),1)]),_:2},1024),o(d,{"grid-column":"2"},{default:a(()=>[s(f(i.value),1)]),_:2},1024),o(d,{"grid-column":"3"},{default:a(()=>[s(f(i.mode),1)]),_:2},1024),o(d,{"grid-column":"4"},{default:a(()=>[s(f(i.oldValue),1)]),_:2},1024)]),_:2},1024))),128))]),_:1})])}const Ne=y(ye,[["render",Ve]]),xe={components:{CollapsePanel:V},props:["epv"],computed:{name(){var e=this.epv;return e.mode?`${e.name} (${e.container_acronym},${e.version_acronym},${e.mode})`:`${e.name} (${e.container_acronym},${e.version_acronym})`}}},Se=s(" Name "),Te=s(" Current Value "),Ee=s(" Change "),Oe=s(" Old Value ");function Be(e,n,r,p,m,l){const d=c("vscode-data-grid-cell"),u=c("vscode-data-grid-row"),t=c("vscode-data-grid"),i=c("vscode-divider"),v=c("collapse-panel");return _(),w(v,{title:l.name},{default:a(()=>[o(t,null,{default:a(()=>[o(u,{"row-type":"header"},{default:a(()=>[o(d,{"row-type":"columnheader","grid-column":"1"},{default:a(()=>[Se]),_:1}),o(d,{"row-type":"columnheader","grid-column":"2"},{default:a(()=>[Te]),_:1}),o(d,{"row-type":"columnheader","grid-column":"3"},{default:a(()=>[Ee]),_:1}),o(d,{"row-type":"columnheader","grid-column":"4"},{default:a(()=>[Oe]),_:1})]),_:1}),(_(!0),h(b,null,C(r.epv._children,g=>(_(),w(u,{key:g.id},{default:a(()=>[o(d,{"grid-column":"1"},{default:a(()=>[s(f(g.name),1)]),_:2},1024),o(d,{"grid-column":"2"},{default:a(()=>[s(f(g.value),1)]),_:2},1024),o(d,{"grid-column":"3"},{default:a(()=>[s(f(g.mode),1)]),_:2},1024),o(d,{"grid-column":"4"},{default:a(()=>[s(f(g.oldValue),1)]),_:2},1024)]),_:2},1024))),128))]),_:1}),o(i)]),_:1},8,["title"])}const Ae=y(xe,[["render",Be]]);function je(e){return e=e||[],e.map(n=>({name:n.name,id:n.name,value:n.current_value}))}function O(e){return e=e||[],e.map(n=>{var r=`${n.name} (${n.container_acronym},${n.version_acronym})`;return{name:n.name,id:r,value:n.name,_children:je(n.epv_variables),container_acronym:n.container_acronym,version_acronym:n.version_acronym}})}const Ie={components:{CompareEpvView:Ae},props:["old","nu"],data(){return{values:[]}},mounted(){var e=O(this.old),n=O(this.nu);this.values.splice(0,0,...k(e,n))}},Me={style:{width:"99%"}};function Pe(e,n,r,p,m,l){const d=c("search-text"),u=c("compare-epv-view");return _(),h("div",Me,[o(d,{onSearch:e.filter},null,8,["onSearch"]),(_(!0),h(b,null,C(m.values,t=>(_(),w(u,{epv:t,key:t.id},null,8,["epv"]))),128))])}const Je=y(Ie,[["render",Pe]]);const Fe={components:{CollapsePanel:V},props:["server"],computed:{title(){var e=this.server;return e.mode?`${e.name} (${e.mode})`:e.name}}},Ge=s(" Name "),ze=s(" Current Value "),Ue=s(" Change "),qe=s(" Old Value ");function He(e,n,r,p,m,l){const d=c("vscode-data-grid-cell"),u=c("vscode-data-grid-row"),t=c("vscode-data-grid"),i=c("collapse-panel");return _(),h("div",null,[o(i,{title:r.server.name},{default:a(()=>[o(t,null,{default:a(()=>[o(u,{"row-type":"header"},{default:a(()=>[o(d,{"row-type":"columnheader","grid-column":"1"},{default:a(()=>[Ge]),_:1}),o(d,{"row-type":"columnheader","grid-column":"2"},{default:a(()=>[ze]),_:1}),o(d,{"row-type":"columnheader","grid-column":"3"},{default:a(()=>[Ue]),_:1}),o(d,{"row-type":"columnheader","grid-column":"4"},{default:a(()=>[qe]),_:1})]),_:1}),(_(!0),h(b,null,C(r.server._children,v=>(_(),w(u,{key:v.name},{default:a(()=>[o(d,{"grid-column":"1"},{default:a(()=>[s(f(v.name),1)]),_:2},1024),o(d,{"grid-column":"2"},{default:a(()=>[s(f(v.value),1)]),_:2},1024),o(d,{"grid-column":"2"},{default:a(()=>[s(f(v.mode),1)]),_:2},1024),o(d,{"grid-column":"2"},{default:a(()=>[s(f(v.oldValue),1)]),_:2},1024)]),_:2},1024))),128))]),_:1})]),_:1},8,["title"])])}const Le=y(Fe,[["render",He],["__scopeId","data-v-fcfb4b01"]]);F().register(G(),z(),U(),q(),H(),L(),K(),Q(),W(),X());const Ke={components:{CompareToolkits:re,CompareTeamBindingTabView:$e,CompareEnvTabView:Ne,CompareEpvTabView:Je,CompareRestServerView:Le},methods:{swapSS(){this.swap=!this.swap,this.view_key="view-key"+String(Math.random())}},computed:{old_ss(){return this.swap?window.input.old:window.input.nu},new_ss(){return this.swap?window.input.nu:window.input.old}},data(){return{swap:!0,view_key:"view-key"}}},Qe=e=>(Y("data-v-894c1d0f"),e=e(),Z(),e),We={class:"swapbar"},Xe=s("Old snapshot"),Ye=Qe(()=>$("span",{class:"codicon codicon-arrow-swap"},null,-1)),Ze=s("New snapshot"),Re=s("Toolkits"),et=s("Team Bindings"),tt=s("Environment Variables"),nt=s("EPV"),at=s("Servers");function ot(e,n,r,p,m,l){const d=c("vscode-text-field"),u=c("vscode-button"),t=c("vscode-panel-tab"),i=c("compare-toolkits"),v=c("vscode-panel-view"),g=c("compare-team-binding-tab-view"),A=c("compare-env-tab-view"),j=c("compare-epv-tab-view"),I=c("compare-rest-server-tab-view"),M=c("vscode-panels");return _(),h("div",null,[$("div",We,[o(d,{disabled:"",value:l.old_ss.name},{default:a(()=>[Xe]),_:1},8,["value"]),o(u,{apperance:"icon",onClick:l.swapSS},{default:a(()=>[Ye]),_:1},8,["onClick"]),o(d,{disabled:"",value:l.new_ss.name},{default:a(()=>[Ze]),_:1},8,["value"])]),o(M,{activeid:"tab-1"},{default:a(()=>[o(t,{id:"tab-1"},{default:a(()=>[Re]),_:1}),o(t,{id:"tab-2"},{default:a(()=>[et]),_:1}),o(t,{id:"tab-3"},{default:a(()=>[tt]),_:1}),o(t,{id:"tab-4"},{default:a(()=>[nt]),_:1}),o(t,{id:"tab-5"},{default:a(()=>[at]),_:1}),o(v,{id:"view-1"},{default:a(()=>[(_(),w(i,{old:l.old_ss.toolkits,nu:l.new_ss.toolkits,key:m.view_key},null,8,["old","nu"]))]),_:1}),o(v,{id:"view-2"},{default:a(()=>[(_(),w(g,{old:l.old_ss.teambindings,nu:l.new_ss.teambindings,key:m.view_key},null,8,["old","nu"]))]),_:1}),o(v,{id:"view-3"},{default:a(()=>[(_(),w(A,{old:l.old_ss.envs,nu:l.new_ss.envs,key:m.view_key},null,8,["old","nu"]))]),_:1}),o(v,{id:"view-4"},{default:a(()=>[(_(),w(j,{old:l.old_ss.epvs,nu:l.new_ss.epvs,key:m.view_key},null,8,["old","nu"]))]),_:1}),o(v,{id:"view-5"},{default:a(()=>[(_(),w(I,{old:l.old_ss.rest_servers,nu:l.new_ss.rest_servers,key:m.view_key},null,8,["old","nu"]))]),_:1})]),_:1})])}const dt=y(Ke,[["render",ot],["__scopeId","data-v-894c1d0f"]]);R(dt).mount("#app");
