import{cg as ai,ch as Bt,ci as ut,cj as ue,ck as oi,cl as vt,cm as pn,a8 as D,cn as ui,co as Vt,cp as Nt,aC as ze,a2 as ci,cq as fe,cr as li,aZ as di,ao as fi,r as m,ad as _t,am as hi,ar as ct,cs as mi,a as K,ct as pi,ap as gn,a6 as Je,cu as yn,cv as vn,cw as gi,cx as yi,cy as vi,j as U,ah as _i,ak as wi,u as bi,cz as Si,cA as xi,cB as Ei,az as Ai,aA as Ri,cC as Pi,aP as Ii,cD as Ci,cE as Li,cF as Oi,aD as Ti,cG as Ui}from"./index.js";import{v as _n,b as Di}from"./useWidgetFocus.js";(function(){try{var e=typeof window<"u"?window:typeof global<"u"?global:typeof globalThis<"u"?globalThis:typeof self<"u"?self:{},t=new e.Error().stack;t&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[t]="90edc5fa-d5ef-4592-98f2-39d31e1f74df",e._sentryDebugIdIdentifier="sentry-dbid-90edc5fa-d5ef-4592-98f2-39d31e1f74df")}catch{}})();const wn=_n>=125?"uv1":"uv2",jt=new vt,Oe=new D;class wt extends ai{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],n=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new Bt(t,3)),this.setAttribute("uv",new Bt(n,2))}applyMatrix4(t){const n=this.attributes.instanceStart,i=this.attributes.instanceEnd;return n!==void 0&&(n.applyMatrix4(t),i.applyMatrix4(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));const i=new ut(n,6,1);return this.setAttribute("instanceStart",new ue(i,3,0)),this.setAttribute("instanceEnd",new ue(i,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t,n=3){let i;t instanceof Float32Array?i=t:Array.isArray(t)&&(i=new Float32Array(t));const s=new ut(i,n*2,1);return this.setAttribute("instanceColorStart",new ue(s,n,0)),this.setAttribute("instanceColorEnd",new ue(s,n,n)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new oi(t.geometry)),this}fromLineSegments(t){const n=t.geometry;return this.setPositions(n.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vt);const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;t!==void 0&&n!==void 0&&(this.boundingBox.setFromBufferAttribute(t),jt.setFromBufferAttribute(n),this.boundingBox.union(jt))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pn),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;if(t!==void 0&&n!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Oe.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Oe)),Oe.fromBufferAttribute(n,r),s=Math.max(s,i.distanceToSquared(Oe));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(t){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(t)}}class bn extends wt{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(t){const n=t.length-3,i=new Float32Array(2*n);for(let s=0;s<n;s+=3)i[2*s]=t[s],i[2*s+1]=t[s+1],i[2*s+2]=t[s+2],i[2*s+3]=t[s+3],i[2*s+4]=t[s+4],i[2*s+5]=t[s+5];return super.setPositions(i),this}setColors(t,n=3){const i=t.length-n,s=new Float32Array(2*i);if(n===3)for(let r=0;r<i;r+=n)s[2*r]=t[r],s[2*r+1]=t[r+1],s[2*r+2]=t[r+2],s[2*r+3]=t[r+3],s[2*r+4]=t[r+4],s[2*r+5]=t[r+5];else for(let r=0;r<i;r+=n)s[2*r]=t[r],s[2*r+1]=t[r+1],s[2*r+2]=t[r+2],s[2*r+3]=t[r+3],s[2*r+4]=t[r+4],s[2*r+5]=t[r+5],s[2*r+6]=t[r+6],s[2*r+7]=t[r+7];return super.setColors(s,n),this}fromLine(t){const n=t.geometry;return this.setPositions(n.attributes.position.array),this}}class bt extends ui{constructor(t){super({type:"LineMaterial",uniforms:Vt.clone(Vt.merge([Nt.common,Nt.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new ze(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${_n>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(n){this.uniforms.diffuse.value=n}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(n){n===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(n){this.uniforms.linewidth.value=n}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(n){!!n!="USE_DASH"in this.defines&&(this.needsUpdate=!0),n===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(n){this.uniforms.dashScale.value=n}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(n){this.uniforms.dashSize.value=n}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(n){this.uniforms.dashOffset.value=n}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(n){this.uniforms.gapSize.value=n}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(n){this.uniforms.opacity.value=n}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(n){this.uniforms.resolution.value.copy(n)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(n){!!n!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),n===!0?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(t)}}const et=new fe,Wt=new D,Ht=new D,C=new fe,L=new fe,q=new fe,tt=new D,nt=new di,O=new li,qt=new D,Te=new vt,Ue=new pn,G=new fe;let X,re;function Gt(e,t,n){return G.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),G.multiplyScalar(1/G.w),G.x=re/n.width,G.y=re/n.height,G.applyMatrix4(e.projectionMatrixInverse),G.multiplyScalar(1/G.w),Math.abs(Math.max(G.x,G.y))}function Mi(e,t){const n=e.matrixWorld,i=e.geometry,s=i.attributes.instanceStart,r=i.attributes.instanceEnd,o=Math.min(i.instanceCount,s.count);for(let a=0,c=o;a<c;a++){O.start.fromBufferAttribute(s,a),O.end.fromBufferAttribute(r,a),O.applyMatrix4(n);const u=new D,p=new D;X.distanceSqToSegment(O.start,O.end,p,u),p.distanceTo(u)<re*.5&&t.push({point:p,pointOnLine:u,distance:X.origin.distanceTo(p),object:e,face:null,faceIndex:a,uv:null,[wn]:null})}}function Fi(e,t,n){const i=t.projectionMatrix,r=e.material.resolution,o=e.matrixWorld,a=e.geometry,c=a.attributes.instanceStart,u=a.attributes.instanceEnd,p=Math.min(a.instanceCount,c.count),h=-t.near;X.at(1,q),q.w=1,q.applyMatrix4(t.matrixWorldInverse),q.applyMatrix4(i),q.multiplyScalar(1/q.w),q.x*=r.x/2,q.y*=r.y/2,q.z=0,tt.copy(q),nt.multiplyMatrices(t.matrixWorldInverse,o);for(let _=0,w=p;_<w;_++){if(C.fromBufferAttribute(c,_),L.fromBufferAttribute(u,_),C.w=1,L.w=1,C.applyMatrix4(nt),L.applyMatrix4(nt),C.z>h&&L.z>h)continue;if(C.z>h){const d=C.z-L.z,f=(C.z-h)/d;C.lerp(L,f)}else if(L.z>h){const d=L.z-C.z,f=(L.z-h)/d;L.lerp(C,f)}C.applyMatrix4(i),L.applyMatrix4(i),C.multiplyScalar(1/C.w),L.multiplyScalar(1/L.w),C.x*=r.x/2,C.y*=r.y/2,L.x*=r.x/2,L.y*=r.y/2,O.start.copy(C),O.start.z=0,O.end.copy(L),O.end.z=0;const y=O.closestPointToPointParameter(tt,!0);O.at(y,qt);const b=fi.lerp(C.z,L.z,y),g=b>=-1&&b<=1,S=tt.distanceTo(qt)<re*.5;if(g&&S){O.start.fromBufferAttribute(c,_),O.end.fromBufferAttribute(u,_),O.start.applyMatrix4(o),O.end.applyMatrix4(o);const d=new D,f=new D;X.distanceSqToSegment(O.start,O.end,f,d),n.push({point:f,pointOnLine:d,distance:X.origin.distanceTo(f),object:e,face:null,faceIndex:_,uv:null,[wn]:null})}}}class Sn extends ci{constructor(t=new wt,n=new bt({color:Math.random()*16777215})){super(t,n),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,n=t.attributes.instanceStart,i=t.attributes.instanceEnd,s=new Float32Array(2*n.count);for(let o=0,a=0,c=n.count;o<c;o++,a+=2)Wt.fromBufferAttribute(n,o),Ht.fromBufferAttribute(i,o),s[a]=a===0?0:s[a-1],s[a+1]=s[a]+Wt.distanceTo(Ht);const r=new ut(s,2,1);return t.setAttribute("instanceDistanceStart",new ue(r,1,0)),t.setAttribute("instanceDistanceEnd",new ue(r,1,1)),this}raycast(t,n){const i=this.material.worldUnits,s=t.camera;s===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const r=t.params.Line2!==void 0&&t.params.Line2.threshold||0;X=t.ray;const o=this.matrixWorld,a=this.geometry,c=this.material;re=c.linewidth+r,a.boundingSphere===null&&a.computeBoundingSphere(),Ue.copy(a.boundingSphere).applyMatrix4(o);let u;if(i)u=re*.5;else{const h=Math.max(s.near,Ue.distanceToPoint(X.origin));u=Gt(s,h,c.resolution)}if(Ue.radius+=u,X.intersectsSphere(Ue)===!1)return;a.boundingBox===null&&a.computeBoundingBox(),Te.copy(a.boundingBox).applyMatrix4(o);let p;if(i)p=re*.5;else{const h=Math.max(s.near,Te.distanceToPoint(X.origin));p=Gt(s,h,c.resolution)}Te.expandByScalar(p),X.intersectsBox(Te)!==!1&&(i?Mi(this,n):Fi(this,s,n))}onBeforeRender(t){const n=this.material.uniforms;n&&n.resolution&&(t.getViewport(et),this.material.uniforms.resolution.value.set(et.z,et.w))}}class zi extends Sn{constructor(t=new bn,n=new bt({color:Math.random()*16777215})){super(t,n),this.isLine2=!0,this.type="Line2"}}const ki=m.forwardRef(function({points:t,color:n=16777215,vertexColors:i,linewidth:s,lineWidth:r,segments:o,dashed:a,...c},u){var p,h;const _=_t(g=>g.size),w=m.useMemo(()=>o?new Sn:new zi,[o]),[v]=m.useState(()=>new bt),y=(i==null||(p=i[0])==null?void 0:p.length)===4?4:3,b=m.useMemo(()=>{const g=o?new wt:new bn,S=t.map(d=>{const f=Array.isArray(d);return d instanceof D||d instanceof fe?[d.x,d.y,d.z]:d instanceof ze?[d.x,d.y,0]:f&&d.length===3?[d[0],d[1],d[2]]:f&&d.length===2?[d[0],d[1],0]:d});if(g.setPositions(S.flat()),i){n=16777215;const d=i.map(f=>f instanceof hi?f.toArray():f);g.setColors(d.flat(),y)}return g},[t,o,i,y]);return m.useLayoutEffect(()=>{w.computeLineDistances()},[t,w]),m.useLayoutEffect(()=>{a?v.defines.USE_DASH="":delete v.defines.USE_DASH,v.needsUpdate=!0},[a,v]),m.useEffect(()=>()=>{b.dispose(),v.dispose()},[b]),m.createElement("primitive",ct({object:w,ref:u},c),m.createElement("primitive",{object:b,attach:"geometry"}),m.createElement("primitive",ct({object:v,attach:"material",color:n,vertexColors:!!i,resolution:[_.width,_.height],linewidth:(h=s??r)!==null&&h!==void 0?h:1,dashed:a,transparent:y===4},c)))}),yr=m.forwardRef(({threshold:e=15,geometry:t,...n},i)=>{const s=m.useRef(null);m.useImperativeHandle(i,()=>s.current,[]);const r=m.useMemo(()=>[0,0,0,1,0,0],[]),o=m.useRef(null),a=m.useRef(null);return m.useLayoutEffect(()=>{const c=s.current.parent,u=t??(c==null?void 0:c.geometry);if(!u||o.current===u&&a.current===e)return;o.current=u,a.current=e;const h=new mi(u,e).attributes.position.array;s.current.geometry.setPositions(h),s.current.geometry.attributes.instanceStart.needsUpdate=!0,s.current.geometry.attributes.instanceEnd.needsUpdate=!0,s.current.computeLineDistances()}),m.createElement(ki,ct({segments:!0,points:r,ref:s,raycast:()=>null},n))}),Bi=`<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <g transform="rotate(-22 16 16)">
    <rect x="6" y="11" width="20" height="11" rx="2.5" fill="#f4f1ea"/>
    <path d="M8.5 11h15a2.5 2.5 0 0 1 2.5 2.5V16H6v-2.5A2.5 2.5 0 0 1 8.5 11z" fill="#00aa72"/>
    <rect x="6" y="11" width="20" height="11" rx="2.5" fill="none" stroke="#0d2118" stroke-width="2"/>
    <path d="M6 16h20" stroke="#0d2118" stroke-width="1.6"/>
  </g>
</svg>`,Vi=`url("data:image/svg+xml,${encodeURIComponent(Bi)}") 16 16, crosshair`,Ni=28;function ji(e,t){var i,s;if(!e||!t||(((i=t.erased)==null?void 0:i.length)??0)<=(((s=e.erased)==null?void 0:s.length)??0))return!1;const n=new Set([...Object.keys(e),...Object.keys(t)]);for(const r of n)if(r!=="erased"&&e[r]!==t[r])return!1;return!0}function vr({cameraPosition:e,cameraTarget:t,debugName:n}){const i=K(f=>f.currentAction),s=K(f=>f.whiteboardContent),r=K(f=>f.focusedWidget),o=K(f=>f.handleWhiteboardErase),a=_t(f=>f.controls),[c]=m.useState(()=>document.createElement("canvas")),u=m.useRef(null),p=m.useRef(null),h=m.useRef(!1),_=m.useRef({generateMipmaps:!0,minFilter:pi}),w=(i==null?void 0:i.name)===gn.ERASE_WHITEBOARD,v=m.useRef(void 0),y=m.useRef(null),b=Di({widgetName:Je.WHITEBOARD,cameraPosition:e,cameraTarget:t,debugName:n});m.useLayoutEffect(()=>{var E;if(y.current!==null&&(((E=s==null?void 0:s.erased)==null?void 0:E.length)??0)===y.current&&ji(v.current,s)){y.current=null,v.current=s;return}y.current=null,c.width=yn,c.height=vn;const f=c.getContext("2d");f&&(f.lineWidth=50,f.lineCap="round",f.lineJoin="round",f.fillStyle="white",f.strokeStyle="black",f.fillRect(0,0,c.width,c.height),s&&gi(f,s),u.current=f,v.current=s,p.current&&(p.current.needsUpdate=!0))},[c,s]);const g=()=>{var E;if(!h.current)return;(E=u.current)==null||E.closePath(),h.current=!1,a&&(a.enabled=!0);const f=p.current;f&&(f.generateMipmaps=_.current.generateMipmaps,f.minFilter=_.current.minFilter,f.needsUpdate=!0)},S=f=>{var T;if(r===Je.WHITEBOARD&&(f.stopPropagation(),f.nativeEvent.stopImmediatePropagation()),!w)return;(T=u.current)==null||T.beginPath(),h.current=!0,a&&(a.enabled=!1);const E=p.current;E&&(_.current={generateMipmaps:E.generateMipmaps,minFilter:E.minFilter},E.generateMipmaps=!1,E.minFilter=yi)},d=({uv:f})=>{var P,V,R,F;if(!w||!h.current||!f||!u.current||!p.current)return;const E=f.x*c.width,T=(1-f.y)*c.height,I=((V=(P=K.getState().whiteboardContent)==null?void 0:P.erased)==null?void 0:V.length)??0;o({x:E,y:T});const M=((F=(R=K.getState().whiteboardContent)==null?void 0:R.erased)==null?void 0:F.length)??0;M>I&&(y.current=M),u.current.arc(E-2,T-2,Ni,0,2*Math.PI),u.current.fill(),p.current.needsUpdate=!0};return m.useEffect(()=>{w||(document.body.style.cursor="auto")},[w]),m.useEffect(()=>{a&&(a.enabled=r!==Je.WHITEBOARD)},[r,a]),{canvas:c,textureRef:p,focus:b,surfaceProps:{onClick:b,onPointerDown:S,onPointerUp:g,onPointerMove:d},hoverProps:{onPointerEnter:()=>{w&&(document.body.style.cursor=Vi)},onPointerLeave:()=>{document.body.style.cursor="auto",g()}}}}const Wi="#00c47f",Hi="rgba(0, 196, 127, 0.5)",qi="rgba(0, 170, 114, 0.07)",De=16,Gi=26,$i=.002,Qi=.012,Xi=.4,Yi=.3,$t=280,Ki=.26,Zi=.0025,Ji=()=>{},ve=.25;function es(e,t){const n=e.getContext("2d");if(!n)return;n.clearRect(0,0,e.width,e.height),n.scale(ve,ve);const i=Pi(t),s=i.x-De,r=i.y-De,o=i.width+De*2,a=i.height+De*2,c=()=>{n.beginPath(),typeof n.roundRect=="function"?n.roundRect(s,r,o,a,Gi):n.rect(s,r,o,a)};c(),n.fillStyle=qi,n.fill(),n.lineWidth=7,n.strokeStyle=Wi,n.shadowColor=Hi,n.shadowBlur=24*ve,c(),n.stroke(),n.shadowBlur=0,c(),n.stroke()}function ts({box:e}){const t=m.useRef(null),n=m.useMemo(()=>{const i=document.createElement("canvas");return i.width=yn*ve,i.height=vn*ve,es(i,e),i},[e]);return _i(({clock:i})=>{const s=t.current;s&&(s.opacity=Ii?.9:.78+.22*Math.sin(i.elapsedTime*2.4))}),U.jsxs("mesh",{position:[0,0,$i],raycast:()=>null,children:[U.jsx("planeGeometry",{args:[1,1]}),U.jsx("meshBasicMaterial",{ref:t,transparent:!0,depthWrite:!1,toneMapped:!1,opacity:.9,children:U.jsx("canvasTexture",{args:[n],attach:"map",colorSpace:wi})})]})}function ns({width:e,height:t,box:n}){const{t:i}=bi(),s=K(_=>Si(_.correctWhiteboardErasesNumber)),r=m.useRef(null);n&&(r.current=n);const o=r.current,a=K(_=>xi(_.whiteboardContent,o)),[c,u]=m.useState(!1);if(m.useEffect(()=>{if(!a){u(!1);return}const _=setTimeout(()=>u(!0),Ei);return()=>clearTimeout(_)},[a,o]),!(n!==null)&&(!a||c))return null;const h=e*Ki/($t*Zi);return U.jsx(Ai,{transform:!0,occlude:"blending",onOcclude:Ji,zIndexRange:Ri,distanceFactor:1,position:[e*Yi,-t*Xi,Qi],scale:h,style:{width:`${$t}px`,pointerEvents:"none"},children:U.jsxs("div",{className:`erase-plaque${a?" erase-plaque--done":""}`,style:{"--erase-fill":`${a?100:s}%`},role:"status",children:[U.jsx("div",{className:"erase-plaque__title",children:i(a?"whiteboard.eraseDone":"whiteboard.eraseTitle")}),U.jsx("div",{className:"erase-plaque__bar","aria-hidden":"true",children:U.jsx("span",{})}),!a&&U.jsx("div",{className:"erase-plaque__hint",children:i("whiteboard.eraseHint")})]})})}function _r({width:e,height:t}){var o;const n=K(a=>a.currentAction),i=(n==null?void 0:n.name)===gn.ERASE_WHITEBOARD,s=(o=n==null?void 0:n.data)==null?void 0:o.coordinates,r=m.useMemo(()=>i&&s?vi(s):null,[i,s]);return U.jsxs(U.Fragment,{children:[r&&U.jsx("group",{scale:[e,t,1],children:U.jsx(ts,{box:r})}),U.jsx(ns,{width:e,height:t,box:r})]})}var St=Ce(),x=e=>Ie(e,St),xt=Ce();x.write=e=>Ie(e,xt);var He=Ce();x.onStart=e=>Ie(e,He);var Et=Ce();x.onFrame=e=>Ie(e,Et);var At=Ce();x.onFinish=e=>Ie(e,At);var ce=[];x.setTimeout=(e,t)=>{const n=x.now()+t,i=()=>{const r=ce.findIndex(o=>o.cancel==i);~r&&ce.splice(r,1),te-=~r?1:0},s={time:n,handler:e,cancel:i};return ce.splice(xn(n),0,s),te+=1,En(),s};var xn=e=>~(~ce.findIndex(t=>t.time>e)||~ce.length);x.cancel=e=>{He.delete(e),Et.delete(e),At.delete(e),St.delete(e),xt.delete(e)};x.sync=e=>{lt=!0,x.batchedUpdates(e),lt=!1};x.throttle=e=>{let t;function n(){try{e(...t)}finally{t=null}}function i(...s){t=s,x.onStart(n)}return i.handler=e,i.cancel=()=>{He.delete(n),t=null},i};var Rt=typeof window<"u"?window.requestAnimationFrame:()=>{};x.use=e=>Rt=e;x.now=typeof performance<"u"?()=>performance.now():Date.now;x.batchedUpdates=e=>e();x.catch=console.error;x.frameLoop="always";x.advance=()=>{x.frameLoop!=="demand"?console.warn("Cannot call the manual advancement of rafz whilst frameLoop is not set as demand"):Rn()};var ee=-1,te=0,lt=!1;function Ie(e,t){lt?(t.delete(e),e(0)):(t.add(e),En())}function En(){ee<0&&(ee=0,x.frameLoop!=="demand"&&Rt(An))}function is(){ee=-1}function An(){~ee&&(Rt(An),x.batchedUpdates(Rn))}function Rn(){const e=ee;ee=x.now();const t=xn(ee);if(t&&(Pn(ce.splice(0,t),n=>n.handler()),te-=t),!te){is();return}He.flush(),St.flush(e?Math.min(64,ee-e):16.667),Et.flush(),xt.flush(),At.flush()}function Ce(){let e=new Set,t=e;return{add(n){te+=t==e&&!e.has(n)?1:0,e.add(n)},delete(n){return te-=t==e&&e.has(n)?1:0,e.delete(n)},flush(n){t.size&&(e=new Set,te-=t.size,Pn(t,i=>i(n)&&e.add(i)),te+=e.size,t=e)}}}function Pn(e,t){e.forEach(n=>{try{t(n)}catch(i){x.catch(i)}})}var ss=Object.defineProperty,rs=(e,t)=>{for(var n in t)ss(e,n,{get:t[n],enumerable:!0})},W={};rs(W,{assign:()=>os,colors:()=>ne,createStringInterpolator:()=>It,skipAnimation:()=>Cn,to:()=>In,willAdvance:()=>Ct});function dt(){}var as=(e,t,n)=>Object.defineProperty(e,t,{value:n,writable:!0,configurable:!0}),l={arr:Array.isArray,obj:e=>!!e&&e.constructor.name==="Object",fun:e=>typeof e=="function",str:e=>typeof e=="string",num:e=>typeof e=="number",und:e=>e===void 0};function Y(e,t){if(l.arr(e)){if(!l.arr(t)||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}return e===t}var A=(e,t)=>e.forEach(t);function Z(e,t,n){if(l.arr(e)){for(let i=0;i<e.length;i++)t.call(n,e[i],`${i}`);return}for(const i in e)e.hasOwnProperty(i)&&t.call(n,e[i],i)}var B=e=>l.und(e)?[]:l.arr(e)?e:[e];function _e(e,t){if(e.size){const n=Array.from(e);e.clear(),A(n,t)}}var ye=(e,...t)=>_e(e,n=>n(...t)),Pt=()=>typeof window>"u"||!window.navigator||/ServerSideRendering|^Deno\//.test(window.navigator.userAgent),It,In,ne=null,Cn=!1,Ct=dt,os=e=>{e.to&&(In=e.to),e.now&&(x.now=e.now),e.colors!==void 0&&(ne=e.colors),e.skipAnimation!=null&&(Cn=e.skipAnimation),e.createStringInterpolator&&(It=e.createStringInterpolator),e.requestAnimationFrame&&x.use(e.requestAnimationFrame),e.batchedUpdates&&(x.batchedUpdates=e.batchedUpdates),e.willAdvance&&(Ct=e.willAdvance),e.frameLoop&&(x.frameLoop=e.frameLoop)},we=new Set,k=[],it=[],ke=0,qe={get idle(){return!we.size&&!k.length},start(e){ke>e.priority?(we.add(e),x.onStart(us)):(Ln(e),x(ft))},advance:ft,sort(e){if(ke)x.onFrame(()=>qe.sort(e));else{const t=k.indexOf(e);~t&&(k.splice(t,1),On(e))}},clear(){k=[],we.clear()}};function us(){we.forEach(Ln),we.clear(),x(ft)}function Ln(e){k.includes(e)||On(e)}function On(e){k.splice(cs(k,t=>t.priority>e.priority),0,e)}function ft(e){const t=it;for(let n=0;n<k.length;n++){const i=k[n];ke=i.priority,i.idle||(Ct(i),i.advance(e),i.idle||t.push(i))}return ke=0,it=k,it.length=0,k=t,k.length>0}function cs(e,t){const n=e.findIndex(t);return n<0?e.length:n}var ls={transparent:0,aliceblue:4042850303,antiquewhite:4209760255,aqua:16777215,aquamarine:2147472639,azure:4043309055,beige:4126530815,bisque:4293182719,black:255,blanchedalmond:4293643775,blue:65535,blueviolet:2318131967,brown:2771004159,burlywood:3736635391,burntsienna:3934150143,cadetblue:1604231423,chartreuse:2147418367,chocolate:3530104575,coral:4286533887,cornflowerblue:1687547391,cornsilk:4294499583,crimson:3692313855,cyan:16777215,darkblue:35839,darkcyan:9145343,darkgoldenrod:3095792639,darkgray:2846468607,darkgreen:6553855,darkgrey:2846468607,darkkhaki:3182914559,darkmagenta:2332068863,darkolivegreen:1433087999,darkorange:4287365375,darkorchid:2570243327,darkred:2332033279,darksalmon:3918953215,darkseagreen:2411499519,darkslateblue:1211993087,darkslategray:793726975,darkslategrey:793726975,darkturquoise:13554175,darkviolet:2483082239,deeppink:4279538687,deepskyblue:12582911,dimgray:1768516095,dimgrey:1768516095,dodgerblue:512819199,firebrick:2988581631,floralwhite:4294635775,forestgreen:579543807,fuchsia:4278255615,gainsboro:3705462015,ghostwhite:4177068031,gold:4292280575,goldenrod:3668254975,gray:2155905279,green:8388863,greenyellow:2919182335,grey:2155905279,honeydew:4043305215,hotpink:4285117695,indianred:3445382399,indigo:1258324735,ivory:4294963455,khaki:4041641215,lavender:3873897215,lavenderblush:4293981695,lawngreen:2096890111,lemonchiffon:4294626815,lightblue:2916673279,lightcoral:4034953471,lightcyan:3774873599,lightgoldenrodyellow:4210742015,lightgray:3553874943,lightgreen:2431553791,lightgrey:3553874943,lightpink:4290167295,lightsalmon:4288707327,lightseagreen:548580095,lightskyblue:2278488831,lightslategray:2005441023,lightslategrey:2005441023,lightsteelblue:2965692159,lightyellow:4294959359,lime:16711935,limegreen:852308735,linen:4210091775,magenta:4278255615,maroon:2147483903,mediumaquamarine:1724754687,mediumblue:52735,mediumorchid:3126187007,mediumpurple:2473647103,mediumseagreen:1018393087,mediumslateblue:2070474495,mediumspringgreen:16423679,mediumturquoise:1221709055,mediumvioletred:3340076543,midnightblue:421097727,mintcream:4127193855,mistyrose:4293190143,moccasin:4293178879,navajowhite:4292783615,navy:33023,oldlace:4260751103,olive:2155872511,olivedrab:1804477439,orange:4289003775,orangered:4282712319,orchid:3664828159,palegoldenrod:4008225535,palegreen:2566625535,paleturquoise:2951671551,palevioletred:3681588223,papayawhip:4293907967,peachpuff:4292524543,peru:3448061951,pink:4290825215,plum:3718307327,powderblue:2967529215,purple:2147516671,rebeccapurple:1714657791,red:4278190335,rosybrown:3163525119,royalblue:1097458175,saddlebrown:2336560127,salmon:4202722047,sandybrown:4104413439,seagreen:780883967,seashell:4294307583,sienna:2689740287,silver:3233857791,skyblue:2278484991,slateblue:1784335871,slategray:1887473919,slategrey:1887473919,snow:4294638335,springgreen:16744447,steelblue:1182971135,tan:3535047935,teal:8421631,thistle:3636451583,tomato:4284696575,turquoise:1088475391,violet:4001558271,wheat:4125012991,white:4294967295,whitesmoke:4126537215,yellow:4294902015,yellowgreen:2597139199},j="[-+]?\\d*\\.?\\d+",Be=j+"%";function Ge(...e){return"\\(\\s*("+e.join(")\\s*,\\s*(")+")\\s*\\)"}var ds=new RegExp("rgb"+Ge(j,j,j)),fs=new RegExp("rgba"+Ge(j,j,j,j)),hs=new RegExp("hsl"+Ge(j,Be,Be)),ms=new RegExp("hsla"+Ge(j,Be,Be,j)),ps=/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,gs=/^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,ys=/^#([0-9a-fA-F]{6})$/,vs=/^#([0-9a-fA-F]{8})$/;function _s(e){let t;return typeof e=="number"?e>>>0===e&&e>=0&&e<=4294967295?e:null:(t=ys.exec(e))?parseInt(t[1]+"ff",16)>>>0:ne&&ne[e]!==void 0?ne[e]:(t=ds.exec(e))?(oe(t[1])<<24|oe(t[2])<<16|oe(t[3])<<8|255)>>>0:(t=fs.exec(e))?(oe(t[1])<<24|oe(t[2])<<16|oe(t[3])<<8|Yt(t[4]))>>>0:(t=ps.exec(e))?parseInt(t[1]+t[1]+t[2]+t[2]+t[3]+t[3]+"ff",16)>>>0:(t=vs.exec(e))?parseInt(t[1],16)>>>0:(t=gs.exec(e))?parseInt(t[1]+t[1]+t[2]+t[2]+t[3]+t[3]+t[4]+t[4],16)>>>0:(t=hs.exec(e))?(Qt(Xt(t[1]),Me(t[2]),Me(t[3]))|255)>>>0:(t=ms.exec(e))?(Qt(Xt(t[1]),Me(t[2]),Me(t[3]))|Yt(t[4]))>>>0:null}function st(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function Qt(e,t,n){const i=n<.5?n*(1+t):n+t-n*t,s=2*n-i,r=st(s,i,e+1/3),o=st(s,i,e),a=st(s,i,e-1/3);return Math.round(r*255)<<24|Math.round(o*255)<<16|Math.round(a*255)<<8}function oe(e){const t=parseInt(e,10);return t<0?0:t>255?255:t}function Xt(e){return(parseFloat(e)%360+360)%360/360}function Yt(e){const t=parseFloat(e);return t<0?0:t>1?255:Math.round(t*255)}function Me(e){const t=parseFloat(e);return t<0?0:t>100?1:t/100}function Kt(e){let t=_s(e);if(t===null)return e;t=t||0;const n=(t&4278190080)>>>24,i=(t&16711680)>>>16,s=(t&65280)>>>8,r=(t&255)/255;return`rgba(${n}, ${i}, ${s}, ${r})`}var Se=(e,t,n)=>{if(l.fun(e))return e;if(l.arr(e))return Se({range:e,output:t,extrapolate:n});if(l.str(e.output[0]))return It(e);const i=e,s=i.output,r=i.range||[0,1],o=i.extrapolateLeft||i.extrapolate||"extend",a=i.extrapolateRight||i.extrapolate||"extend",c=i.easing||(u=>u);return u=>{const p=bs(u,r);return ws(u,r[p],r[p+1],s[p],s[p+1],c,o,a,i.map)}};function ws(e,t,n,i,s,r,o,a,c){let u=c?c(e):e;if(u<t){if(o==="identity")return u;o==="clamp"&&(u=t)}if(u>n){if(a==="identity")return u;a==="clamp"&&(u=n)}return i===s?i:t===n?e<=t?i:s:(t===-1/0?u=-u:n===1/0?u=u-t:u=(u-t)/(n-t),u=r(u),i===-1/0?u=-u:s===1/0?u=u+i:u=u*(s-i)+i,u)}function bs(e,t){for(var n=1;n<t.length-1&&!(t[n]>=e);++n);return n-1}var Ss={linear:e=>e},xe=Symbol.for("FluidValue.get"),de=Symbol.for("FluidValue.observers"),Q=e=>!!(e&&e[xe]),z=e=>e&&e[xe]?e[xe]():e,Zt=e=>e[de]||null;function xs(e,t){e.eventObserved?e.eventObserved(t):e(t)}function Ve(e,t){const n=e[de];n&&n.forEach(i=>{xs(i,t)})}var Es=class{constructor(e){if(!e&&!(e=this.get))throw Error("Unknown getter");As(this,e)}},As=(e,t)=>Tn(e,xe,t);function Le(e,t){if(e[xe]){let n=e[de];n||Tn(e,de,n=new Set),n.has(t)||(n.add(t),e.observerAdded&&e.observerAdded(n.size,t))}return t}function Ne(e,t){const n=e[de];if(n&&n.has(t)){const i=n.size-1;i?n.delete(t):e[de]=null,e.observerRemoved&&e.observerRemoved(i,t)}}var Tn=(e,t,n)=>Object.defineProperty(e,t,{value:n,writable:!0,configurable:!0}),Fe=/[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,Rs=/(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi,Jt=new RegExp(`(${Fe.source})(%|[a-z]+)`,"i"),Ps=/rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi,$e=/var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/,Un=e=>{const[t,n]=Is(e);if(!t||Pt())return e;const i=window.getComputedStyle(document.documentElement).getPropertyValue(t);if(i)return i.trim();if(n&&n.startsWith("--")){const s=window.getComputedStyle(document.documentElement).getPropertyValue(n);return s||e}else{if(n&&$e.test(n))return Un(n);if(n)return n}return e},Is=e=>{const t=$e.exec(e);if(!t)return[,];const[,n,i]=t;return[n,i]},rt,Cs=(e,t,n,i,s)=>`rgba(${Math.round(t)}, ${Math.round(n)}, ${Math.round(i)}, ${s})`,Dn=e=>{rt||(rt=ne?new RegExp(`(${Object.keys(ne).join("|")})(?!\\w)`,"g"):/^\b$/);const t=e.output.map(r=>z(r).replace($e,Un).replace(Rs,Kt).replace(rt,Kt)),n=t.map(r=>r.match(Fe).map(Number)),s=n[0].map((r,o)=>n.map(a=>{if(!(o in a))throw Error('The arity of each "output" value must be equal');return a[o]})).map(r=>Se({...e,output:r}));return r=>{var c;const o=!Jt.test(t[0])&&((c=t.find(u=>Jt.test(u)))==null?void 0:c.replace(Fe,""));let a=0;return t[0].replace(Fe,()=>`${s[a++](r)}${o||""}`).replace(Ps,Cs)}},Lt="react-spring: ",Mn=e=>{const t=e;let n=!1;if(typeof t!="function")throw new TypeError(`${Lt}once requires a function parameter`);return(...i)=>{n||(t(...i),n=!0)}},Ls=Mn(console.warn);function Os(){Ls(`${Lt}The "interpolate" function is deprecated in v9 (use "to" instead)`)}var Ts=Mn(console.warn);function Us(){Ts(`${Lt}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`)}function Qe(e){return l.str(e)&&(e[0]=="#"||/\d/.test(e)||!Pt()&&$e.test(e)||e in(ne||{}))}var Ot=Pt()?m.useEffect:m.useLayoutEffect,Ds=()=>{const e=m.useRef(!1);return Ot(()=>(e.current=!0,()=>{e.current=!1}),[]),e};function Fn(){const e=m.useState()[1],t=Ds();return()=>{t.current&&e(Math.random())}}var zn=e=>m.useEffect(e,Ms),Ms=[];function en(e){const t=m.useRef(void 0);return m.useEffect(()=>{t.current=e}),t.current}var Ee=Symbol.for("Animated:node"),Fs=e=>!!e&&e[Ee]===e,$=e=>e&&e[Ee],Tt=(e,t)=>as(e,Ee,t),Xe=e=>e&&e[Ee]&&e[Ee].getPayload(),kn=class{constructor(){Tt(this,this)}getPayload(){return this.payload||[]}},Ye=class Bn extends kn{constructor(t){super(),this._value=t,this.done=!0,this.durationProgress=0,l.num(this._value)&&(this.lastPosition=this._value)}static create(t){return new Bn(t)}getPayload(){return[this]}getValue(){return this._value}setValue(t,n){return l.num(t)&&(this.lastPosition=t,n&&(t=Math.round(t/n)*n,this.done&&(this.lastPosition=t))),this._value===t?!1:(this._value=t,!0)}reset(){const{done:t}=this;this.done=!1,l.num(this._value)&&(this.elapsedTime=0,this.durationProgress=0,this.lastPosition=this._value,t&&(this.lastVelocity=null),this.v0=null)}},je=class Vn extends Ye{constructor(t){super(0),this._string=null,this._toString=Se({output:[t,t]})}static create(t){return new Vn(t)}getValue(){const t=this._string;return t??(this._string=this._toString(this._value))}setValue(t){if(l.str(t)){if(t==this._string)return!1;this._string=t,this._value=1}else if(super.setValue(t))this._string=null;else return!1;return!0}reset(t){t&&(this._toString=Se({output:[this.getValue(),t]})),this._value=0,super.reset()}},We={dependencies:null},Ut=class extends kn{constructor(e){super(),this.source=e,this.setValue(e)}getValue(e){const t={};return Z(this.source,(n,i)=>{Fs(n)?t[i]=n.getValue(e):Q(n)?t[i]=z(n):e||(t[i]=n)}),t}setValue(e){this.source=e,this.payload=this._makePayload(e)}reset(){this.payload&&A(this.payload,e=>e.reset())}_makePayload(e){if(e){const t=new Set;return Z(e,this._addToPayload,t),Array.from(t)}}_addToPayload(e){We.dependencies&&Q(e)&&We.dependencies.add(e);const t=Xe(e);t&&A(t,n=>this.add(n))}},zs=class Nn extends Ut{constructor(t){super(t)}static create(t){return new Nn(t)}getValue(){return this.source.map(t=>t.getValue())}setValue(t){const n=this.getPayload();return t.length==n.length?n.map((i,s)=>i.setValue(t[s])).some(Boolean):(super.setValue(t.map(ks)),!0)}};function ks(e){return(Qe(e)?je:Ye).create(e)}function ht(e){const t=$(e);return t?t.constructor:l.arr(e)?zs:Qe(e)?je:Ye}var tn=(e,t)=>{const n=!l.fun(e)||e.prototype&&e.prototype.isReactComponent;return m.forwardRef((i,s)=>{const r=m.useRef(null),o=n&&m.useCallback(v=>{r.current=Ns(s,v)},[s]),[a,c]=Vs(i,t),u=Fn(),p=()=>{const v=r.current;if(n&&!v)return;(v?t.applyAnimatedValues(v,a.getValue(!0)):!1)===!1&&u()},h=new Bs(p,c),_=m.useRef(void 0);Ot(()=>(_.current=h,A(c,v=>Le(v,h)),()=>{_.current&&(A(_.current.deps,v=>Ne(v,_.current)),x.cancel(_.current.update))})),m.useEffect(p,[]),zn(()=>()=>{const v=_.current;A(v.deps,y=>Ne(y,v))});const w=t.getComponentProps(a.getValue());return m.createElement(e,{...w,ref:o})})},Bs=class{constructor(e,t){this.update=e,this.deps=t}eventObserved(e){e.type=="change"&&x.write(this.update)}};function Vs(e,t){const n=new Set;return We.dependencies=n,e.style&&(e={...e,style:t.createAnimatedStyle(e.style)}),e=new Ut(e),We.dependencies=null,[e,n]}function Ns(e,t){return e&&(l.fun(e)?e(t):e.current=t),t}var nn=Symbol.for("AnimatedComponent"),js=(e,{applyAnimatedValues:t=()=>!1,createAnimatedStyle:n=s=>new Ut(s),getComponentProps:i=s=>s}={})=>{const s={applyAnimatedValues:t,createAnimatedStyle:n,getComponentProps:i},r=o=>{const a=sn(o)||"Anonymous";return l.str(o)?o=r[o]||(r[o]=tn(o,s)):o=o[nn]||(o[nn]=tn(o,s)),o.displayName=`Animated(${a})`,o};return Z(e,(o,a)=>{l.arr(e)&&(a=sn(o)),r[a]=r(o)}),{animated:r}},sn=e=>l.str(e)?e:e&&l.str(e.displayName)?e.displayName:l.fun(e)&&e.name||null;function se(e,...t){return l.fun(e)?e(...t):e}var be=(e,t)=>e===!0||!!(t&&e&&(l.fun(e)?e(t):B(e).includes(t))),jn=(e,t)=>l.obj(e)?t&&e[t]:e,Wn=(e,t)=>e.default===!0?e[t]:e.default?e.default[t]:void 0,Ws=e=>e,Dt=(e,t=Ws)=>{let n=Hs;e.default&&e.default!==!0&&(e=e.default,n=Object.keys(e));const i={};for(const s of n){const r=t(e[s],s);l.und(r)||(i[s]=r)}return i},Hs=["config","onProps","onStart","onChange","onPause","onResume","onRest"],qs={config:1,from:1,to:1,ref:1,loop:1,reset:1,pause:1,cancel:1,reverse:1,immediate:1,default:1,delay:1,onProps:1,onStart:1,onChange:1,onPause:1,onResume:1,onRest:1,onResolve:1,items:1,trail:1,sort:1,expires:1,initial:1,enter:1,update:1,leave:1,children:1,onDestroyed:1,keys:1,callId:1,parentId:1};function Gs(e){const t={};let n=0;if(Z(e,(i,s)=>{qs[s]||(t[s]=i,n++)}),n)return t}function Hn(e){const t=Gs(e);if(t){const n={to:t};return Z(e,(i,s)=>s in t||(n[s]=i)),n}return{...e}}function Ae(e){return e=z(e),l.arr(e)?e.map(Ae):Qe(e)?W.createStringInterpolator({range:[0,1],output:[e,e]})(1):e}function $s(e){for(const t in e)return!0;return!1}function mt(e){return l.fun(e)||l.arr(e)&&l.obj(e[0])}function Qs(e,t){var n;(n=e.ref)==null||n.delete(e),t==null||t.delete(e)}function Xs(e,t){var n;t&&e.ref!==t&&((n=e.ref)==null||n.delete(e),t.add(e),e.ref=t)}var Ys={default:{tension:170,friction:26}},pt={...Ys.default,mass:1,damping:1,easing:Ss.linear,clamp:!1},Ks=class{constructor(){this.velocity=0,Object.assign(this,pt)}};function Zs(e,t,n){n&&(n={...n},rn(n,t),t={...n,...t}),rn(e,t),Object.assign(e,t);for(const o in pt)e[o]==null&&(e[o]=pt[o]);let{frequency:i,damping:s}=e;const{mass:r}=e;return l.und(i)||(i<.01&&(i=.01),s<0&&(s=0),e.tension=Math.pow(2*Math.PI/i,2)*r,e.friction=4*Math.PI*s*r/i),e}function rn(e,t){if(!l.und(t.decay))e.duration=void 0;else{const n=!l.und(t.tension)||!l.und(t.friction);(n||!l.und(t.frequency)||!l.und(t.damping)||!l.und(t.mass))&&(e.duration=void 0,e.decay=void 0),n&&(e.frequency=void 0)}}var an=[],Js=class{constructor(){this.changed=!1,this.values=an,this.toValues=null,this.fromValues=an,this.config=new Ks,this.immediate=!1}};function qn(e,{key:t,props:n,defaultProps:i,state:s,actions:r}){return new Promise((o,a)=>{let c,u,p=be(n.cancel??(i==null?void 0:i.cancel),t);if(p)w();else{l.und(n.pause)||(s.paused=be(n.pause,t));let v=i==null?void 0:i.pause;v!==!0&&(v=s.paused||be(v,t)),c=se(n.delay||0,t),v?(s.resumeQueue.add(_),r.pause()):(r.resume(),_())}function h(){s.resumeQueue.add(_),s.timeouts.delete(u),u.cancel(),c=u.time-x.now()}function _(){c>0&&!W.skipAnimation?(s.delayed=!0,u=x.setTimeout(w,c),s.pauseQueue.add(h),s.timeouts.add(u)):w()}function w(){s.delayed&&(s.delayed=!1),s.pauseQueue.delete(h),s.timeouts.delete(u),e<=(s.cancelId||0)&&(p=!0);try{r.start({...n,callId:e,cancel:p},o)}catch(v){a(v)}}})}var Mt=(e,t)=>t.length==1?t[0]:t.some(n=>n.cancelled)?le(e.get()):t.every(n=>n.noop)?Gn(e.get()):N(e.get(),t.every(n=>n.finished)),Gn=e=>({value:e,noop:!0,finished:!0,cancelled:!1}),N=(e,t,n=!1)=>({value:e,finished:t,cancelled:n}),le=e=>({value:e,cancelled:!0,finished:!1});function $n(e,t,n,i){const{callId:s,parentId:r,onRest:o}=t,{asyncTo:a,promise:c}=n;return!r&&e===a&&!t.reset?c:n.promise=(async()=>{n.asyncId=s,n.asyncTo=e;const u=Dt(t,(b,g)=>g==="onRest"?void 0:b);let p,h;const _=new Promise((b,g)=>(p=b,h=g)),w=b=>{const g=s<=(n.cancelId||0)&&le(i)||s!==n.asyncId&&N(i,!1);if(g)throw b.result=g,h(b),b},v=(b,g)=>{const S=new on,d=new un;return(async()=>{if(W.skipAnimation)throw Re(n),d.result=N(i,!1),h(d),d;w(S);const f=l.obj(b)?{...b}:{...g,to:b};f.parentId=s,Z(u,(T,I)=>{l.und(f[I])&&(f[I]=T)});const E=await i.start(f);return w(S),n.paused&&await new Promise(T=>{n.resumeQueue.add(T)}),E})()};let y;if(W.skipAnimation)return Re(n),N(i,!1);try{let b;l.arr(e)?b=(async g=>{for(const S of g)await v(S)})(e):b=Promise.resolve(e(v,i.stop.bind(i))),await Promise.all([b.then(p),_]),y=N(i.get(),!0,!1)}catch(b){if(b instanceof on)y=b.result;else if(b instanceof un)y=b.result;else throw b}finally{s==n.asyncId&&(n.asyncId=r,n.asyncTo=r?a:void 0,n.promise=r?c:void 0)}return l.fun(o)&&x.batchedUpdates(()=>{o(y,i,i.item)}),y})()}function Re(e,t){_e(e.timeouts,n=>n.cancel()),e.pauseQueue.clear(),e.resumeQueue.clear(),e.asyncId=e.asyncTo=e.promise=void 0,t&&(e.cancelId=t)}var on=class extends Error{constructor(){super("An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise.")}},un=class extends Error{constructor(){super("SkipAnimationSignal")}},gt=e=>e instanceof Ft,er=1,Ft=class extends Es{constructor(){super(...arguments),this.id=er++,this._priority=0}get priority(){return this._priority}set priority(e){this._priority!=e&&(this._priority=e,this._onPriorityChange(e))}get(){const e=$(this);return e&&e.getValue()}to(...e){return W.to(this,e)}interpolate(...e){return Os(),W.to(this,e)}toJSON(){return this.get()}observerAdded(e){e==1&&this._attach()}observerRemoved(e){e==0&&this._detach()}_attach(){}_detach(){}_onChange(e,t=!1){Ve(this,{type:"change",parent:this,value:e,idle:t})}_onPriorityChange(e){this.idle||qe.sort(this),Ve(this,{type:"priority",parent:this,priority:e})}},ae=Symbol.for("SpringPhase"),Qn=1,Xn=2,Yn=4,at=e=>(e[ae]&Qn)>0,J=e=>(e[ae]&Xn)>0,me=e=>(e[ae]&Yn)>0,cn=(e,t)=>t?e[ae]|=Xn|Qn:e[ae]&=-3,ln=(e,t)=>t?e[ae]|=Yn:e[ae]&=-5,tr=class extends Ft{constructor(e,t){if(super(),this.animation=new Js,this.defaultProps={},this._state={paused:!1,delayed:!1,pauseQueue:new Set,resumeQueue:new Set,timeouts:new Set},this._pendingCalls=new Set,this._lastCallId=0,this._lastToId=0,this._memoizedDuration=0,!l.und(e)||!l.und(t)){const n=l.obj(e)?{...e}:{...t,from:e};l.und(n.default)&&(n.default=!0),this.start(n)}}get idle(){return!(J(this)||this._state.asyncTo)||me(this)}get goal(){return z(this.animation.to)}get velocity(){const e=$(this);return e instanceof Ye?e.lastVelocity||0:e.getPayload().map(t=>t.lastVelocity||0)}get hasAnimated(){return at(this)}get isAnimating(){return J(this)}get isPaused(){return me(this)}get isDelayed(){return this._state.delayed}advance(e){let t=!0,n=!1;const i=this.animation;let{toValues:s}=i;const{config:r}=i,o=Xe(i.to);!o&&Q(i.to)&&(s=B(z(i.to))),i.values.forEach((u,p)=>{if(u.done)return;const h=u.constructor==je?1:o?o[p].lastPosition:s[p];let _=i.immediate,w=h;if(!_){if(w=u.lastPosition,r.tension<=0){u.done=!0;return}let v=u.elapsedTime+=e;const y=i.fromValues[p],b=u.v0!=null?u.v0:u.v0=l.arr(r.velocity)?r.velocity[p]:r.velocity;let g;const S=r.precision||(y==h?.005:Math.min(1,Math.abs(h-y)*.001));if(l.und(r.duration))if(r.decay){const d=r.decay===!0?.998:r.decay,f=Math.exp(-(1-d)*v);w=y+b/(1-d)*(1-f),_=Math.abs(u.lastPosition-w)<=S,g=b*f}else{g=u.lastVelocity==null?b:u.lastVelocity;const d=r.restVelocity||S/10,f=r.clamp?0:r.bounce,E=!l.und(f),T=y==h?u.v0>0:y<h;let I,M=!1;const P=1,V=Math.ceil(e/P);for(let R=0;R<V&&(I=Math.abs(g)>d,!(!I&&(_=Math.abs(h-w)<=S,_)));++R){E&&(M=w==h||w>h==T,M&&(g=-g*f,w=h));const F=-r.tension*1e-6*(w-h),H=-r.friction*.001*g,Ke=(F+H)/r.mass;g=g+Ke*P,w=w+g*P}}else{let d=1;r.duration>0&&(this._memoizedDuration!==r.duration&&(this._memoizedDuration=r.duration,u.durationProgress>0&&(u.elapsedTime=r.duration*u.durationProgress,v=u.elapsedTime+=e)),d=(r.progress||0)+v/this._memoizedDuration,d=d>1?1:d<0?0:d,u.durationProgress=d),w=y+r.easing(d)*(h-y),g=(w-u.lastPosition)/e,_=d==1}u.lastVelocity=g,Number.isNaN(w)&&(console.warn("Got NaN while animating:",this),_=!0)}o&&!o[p].done&&(_=!1),_?u.done=!0:t=!1,u.setValue(w,r.round)&&(n=!0)});const a=$(this),c=a.getValue();if(t){const u=z(i.to);(c!==u||n)&&!r.decay?(a.setValue(u),this._onChange(u)):n&&r.decay&&this._onChange(c),this._stop()}else n&&this._onChange(c)}set(e){return x.batchedUpdates(()=>{this._stop(),this._focus(e),this._set(e)}),this}pause(){this._update({pause:!0})}resume(){this._update({pause:!1})}finish(){if(J(this)){const{to:e,config:t}=this.animation;x.batchedUpdates(()=>{this._onStart(),t.decay||this._set(e,!1),this._stop()})}return this}update(e){return(this.queue||(this.queue=[])).push(e),this}start(e,t){let n;return l.und(e)?(n=this.queue||[],this.queue=[]):n=[l.obj(e)?e:{...t,to:e}],Promise.all(n.map(i=>this._update(i))).then(i=>Mt(this,i))}stop(e){const{to:t}=this.animation;return this._focus(this.get()),Re(this._state,e&&this._lastCallId),x.batchedUpdates(()=>this._stop(t,e)),this}reset(){this._update({reset:!0})}eventObserved(e){e.type=="change"?this._start():e.type=="priority"&&(this.priority=e.priority+1)}_prepareNode(e){const t=this.key||"";let{to:n,from:i}=e;n=l.obj(n)?n[t]:n,(n==null||mt(n))&&(n=void 0),i=l.obj(i)?i[t]:i,i==null&&(i=void 0);const s={to:n,from:i};return at(this)||(e.reverse&&([n,i]=[i,n]),i=z(i),l.und(i)?$(this)||this._set(n):this._set(i)),s}_update({...e},t){const{key:n,defaultProps:i}=this;e.default&&Object.assign(i,Dt(e,(o,a)=>/^on/.test(a)?jn(o,n):o)),fn(this,e,"onProps"),ge(this,"onProps",e,this);const s=this._prepareNode(e);if(Object.isFrozen(this))throw Error("Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?");const r=this._state;return qn(++this._lastCallId,{key:n,props:e,defaultProps:i,state:r,actions:{pause:()=>{me(this)||(ln(this,!0),ye(r.pauseQueue),ge(this,"onPause",N(this,pe(this,this.animation.to)),this))},resume:()=>{me(this)&&(ln(this,!1),J(this)&&this._resume(),ye(r.resumeQueue),ge(this,"onResume",N(this,pe(this,this.animation.to)),this))},start:this._merge.bind(this,s)}}).then(o=>{if(e.loop&&o.finished&&!(t&&o.noop)){const a=Kn(e);if(a)return this._update(a,!0)}return o})}_merge(e,t,n){if(t.cancel)return this.stop(!0),n(le(this));const i=!l.und(e.to),s=!l.und(e.from);if(i||s)if(t.callId>this._lastToId)this._lastToId=t.callId;else return n(le(this));const{key:r,defaultProps:o,animation:a}=this,{to:c,from:u}=a;let{to:p=c,from:h=u}=e;s&&!i&&(!t.default||l.und(p))&&(p=h),t.reverse&&([p,h]=[h,p]);const _=!Y(h,u);_&&(a.from=h),h=z(h);const w=!Y(p,c);w&&this._focus(p);const v=mt(t.to),{config:y}=a,{decay:b,velocity:g}=y;(i||s)&&(y.velocity=0),t.config&&!v&&Zs(y,se(t.config,r),t.config!==o.config?se(o.config,r):void 0);let S=$(this);if(!S||l.und(p))return n(N(this,!0));const d=l.und(t.reset)?s&&!t.default:!l.und(h)&&be(t.reset,r),f=d?h:this.get(),E=Ae(p),T=l.num(E)||l.arr(E)||Qe(E),I=!v&&(!T||be(o.immediate||t.immediate,r));if(w){const R=ht(p);if(R!==S.constructor)if(I)S=this._set(E);else throw Error(`Cannot animate between ${S.constructor.name} and ${R.name}, as the "to" prop suggests`)}const M=S.constructor;let P=Q(p),V=!1;if(!P){const R=d||!at(this)&&_;(w||R)&&(V=Y(Ae(f),E),P=!V),(!Y(a.immediate,I)&&!I||!Y(y.decay,b)||!Y(y.velocity,g))&&(P=!0)}if(V&&J(this)&&(a.changed&&!d?P=!0:P||this._stop(c)),!v&&((P||Q(c))&&(a.values=S.getPayload(),a.toValues=Q(p)?null:M==je?[1]:B(E)),a.immediate!=I&&(a.immediate=I,!I&&!d&&this._set(c)),P)){const{onRest:R}=a;A(ir,H=>fn(this,t,H));const F=N(this,pe(this,c));ye(this._pendingCalls,F),this._pendingCalls.add(n),a.changed&&x.batchedUpdates(()=>{var H;a.changed=!d,R==null||R(F,this),d?se(o.onRest,F):(H=a.onStart)==null||H.call(a,F,this)})}d&&this._set(f),v?n($n(t.to,t,this._state,this)):P?this._start():J(this)&&!w?this._pendingCalls.add(n):n(Gn(f))}_focus(e){const t=this.animation;e!==t.to&&(Zt(this)&&this._detach(),t.to=e,Zt(this)&&this._attach())}_attach(){let e=0;const{to:t}=this.animation;Q(t)&&(Le(t,this),gt(t)&&(e=t.priority+1)),this.priority=e}_detach(){const{to:e}=this.animation;Q(e)&&Ne(e,this)}_set(e,t=!0){const n=z(e);if(!l.und(n)){const i=$(this);if(!i||!Y(n,i.getValue())){const s=ht(n);!i||i.constructor!=s?Tt(this,s.create(n)):i.setValue(n),i&&x.batchedUpdates(()=>{this._onChange(n,t)})}}return $(this)}_onStart(){const e=this.animation;e.changed||(e.changed=!0,ge(this,"onStart",N(this,pe(this,e.to)),this))}_onChange(e,t){t||(this._onStart(),se(this.animation.onChange,e,this)),se(this.defaultProps.onChange,e,this),super._onChange(e,t)}_start(){const e=this.animation;$(this).reset(z(e.to)),e.immediate||(e.fromValues=e.values.map(t=>t.lastPosition)),J(this)||(cn(this,!0),me(this)||this._resume())}_resume(){W.skipAnimation?this.finish():qe.start(this)}_stop(e,t){if(J(this)){cn(this,!1);const n=this.animation;A(n.values,s=>{s.done=!0}),n.toValues&&(n.onChange=n.onPause=n.onResume=void 0),Ve(this,{type:"idle",parent:this});const i=t?le(this.get()):N(this.get(),pe(this,e??n.to));ye(this._pendingCalls,i),n.changed&&(n.changed=!1,ge(this,"onRest",i,this))}}};function pe(e,t){const n=Ae(t),i=Ae(e.get());return Y(i,n)}function Kn(e,t=e.loop,n=e.to){const i=se(t);if(i){const s=i!==!0&&Hn(i),r=(s||e).reverse,o=!s||s.reset;return Pe({...e,loop:t,default:!1,pause:void 0,to:!r||mt(n)?n:void 0,from:o?e.from:void 0,reset:o,...s})}}function Pe(e){const{to:t,from:n}=e=Hn(e),i=new Set;return l.obj(t)&&dn(t,i),l.obj(n)&&dn(n,i),e.keys=i.size?Array.from(i):null,e}function nr(e){const t=Pe(e);return l.und(t.default)&&(t.default=Dt(t)),t}function dn(e,t){Z(e,(n,i)=>n!=null&&t.add(i))}var ir=["onStart","onRest","onChange","onPause","onResume"];function fn(e,t,n){e.animation[n]=t[n]!==Wn(t,n)?jn(t[n],e.key):void 0}function ge(e,t,...n){var i,s,r,o;(s=(i=e.animation)[t])==null||s.call(i,...n),(o=(r=e.defaultProps)[t])==null||o.call(r,...n)}var sr=["onStart","onChange","onRest"],rr=1,ar=class{constructor(e,t){this.id=rr++,this.springs={},this.queue=[],this._lastAsyncId=0,this._active=new Set,this._changed=new Set,this._started=!1,this._state={paused:!1,pauseQueue:new Set,resumeQueue:new Set,timeouts:new Set},this._events={onStart:new Map,onChange:new Map,onRest:new Map},this._onFrame=this._onFrame.bind(this),t&&(this._flush=t),e&&this.start({default:!0,...e})}get idle(){return!this._state.asyncTo&&Object.values(this.springs).every(e=>e.idle&&!e.isDelayed&&!e.isPaused)}get item(){return this._item}set item(e){this._item=e}get(){const e={};return this.each((t,n)=>e[n]=t.get()),e}set(e){for(const t in e){const n=e[t];l.und(n)||this.springs[t].set(n)}}update(e){return e&&this.queue.push(Pe(e)),this}start(e){let{queue:t}=this;return e?t=B(e).map(Pe):this.queue=[],this._flush?this._flush(this,t):(ni(this,t),yt(this,t))}stop(e,t){if(e!==!!e&&(t=e),t){const n=this.springs;A(B(t),i=>n[i].stop(!!e))}else Re(this._state,this._lastAsyncId),this.each(n=>n.stop(!!e));return this}pause(e){if(l.und(e))this.start({pause:!0});else{const t=this.springs;A(B(e),n=>t[n].pause())}return this}resume(e){if(l.und(e))this.start({pause:!1});else{const t=this.springs;A(B(e),n=>t[n].resume())}return this}each(e){Z(this.springs,e)}_onFrame(){const{onStart:e,onChange:t,onRest:n}=this._events,i=this._active.size>0,s=this._changed.size>0;(i&&!this._started||s&&!this._started)&&(this._started=!0,_e(e,([a,c])=>{c.value=this.get(),a(c,this,this._item)}));const r=!i&&this._started,o=s||r&&n.size?this.get():null;s&&t.size&&_e(t,([a,c])=>{c.value=o,a(c,this,this._item)}),r&&(this._started=!1,_e(n,([a,c])=>{c.value=o,a(c,this,this._item)}))}eventObserved(e){if(e.type=="change")this._changed.add(e.parent),e.idle||this._active.add(e.parent);else if(e.type=="idle")this._active.delete(e.parent);else return;x.onFrame(this._onFrame)}};function yt(e,t){return Promise.all(t.map(n=>Zn(e,n))).then(n=>Mt(e,n))}async function Zn(e,t,n){const{keys:i,to:s,from:r,loop:o,onRest:a,onResolve:c}=t,u=l.obj(t.default)&&t.default;o&&(t.loop=!1),s===!1&&(t.to=null),r===!1&&(t.from=null);const p=l.arr(s)||l.fun(s)?s:void 0;p?(t.to=void 0,t.onRest=void 0,u&&(u.onRest=void 0)):A(sr,y=>{const b=t[y];if(l.fun(b)){const g=e._events[y];t[y]=({finished:S,cancelled:d})=>{const f=g.get(b);f?(S||(f.finished=!1),d&&(f.cancelled=!0)):g.set(b,{value:null,finished:S||!1,cancelled:d||!1})},u&&(u[y]=t[y])}});const h=e._state;t.pause===!h.paused?(h.paused=t.pause,ye(t.pause?h.pauseQueue:h.resumeQueue)):h.paused&&(t.pause=!0);const _=(i||Object.keys(e.springs)).map(y=>e.springs[y].start(t)),w=t.cancel===!0||Wn(t,"cancel")===!0;(p||w&&h.asyncId)&&_.push(qn(++e._lastAsyncId,{props:t,state:h,actions:{pause:dt,resume:dt,start(y,b){w?(Re(h,e._lastAsyncId),b(le(e))):(y.onRest=a,b($n(p,y,h,e)))}}})),h.paused&&await new Promise(y=>{h.resumeQueue.add(y)});const v=Mt(e,await Promise.all(_));if(o&&v.finished&&!(n&&v.noop)){const y=Kn(t,o,s);if(y)return ni(e,[y]),Zn(e,y,!0)}return c&&x.batchedUpdates(()=>c(v,e,e.item)),v}function hn(e,t){const n={...e.springs};return t&&A(B(t),i=>{l.und(i.keys)&&(i=Pe(i)),l.obj(i.to)||(i={...i,to:void 0}),ti(n,i,s=>ei(s))}),Jn(e,n),n}function Jn(e,t){Z(t,(n,i)=>{e.springs[i]||(e.springs[i]=n,Le(n,e))})}function ei(e,t){const n=new tr;return n.key=e,t&&Le(n,t),n}function ti(e,t,n){t.keys&&A(t.keys,i=>{(e[i]||(e[i]=n(i)))._prepareNode(t)})}function ni(e,t){A(t,n=>{ti(e.springs,n,i=>ei(i,e))})}var or=m.createContext({pause:!1,immediate:!1}),ur=()=>{const e=[],t=function(i){Us();const s=[];return A(e,(r,o)=>{if(l.und(i))s.push(r.start());else{const a=n(i,r,o);a&&s.push(r.start(a))}}),s};t.current=e,t.add=function(i){e.includes(i)||e.push(i)},t.delete=function(i){const s=e.indexOf(i);~s&&e.splice(s,1)},t.pause=function(){return A(e,i=>i.pause(...arguments)),this},t.resume=function(){return A(e,i=>i.resume(...arguments)),this},t.set=function(i){A(e,(s,r)=>{const o=l.fun(i)?i(r,s):i;o&&s.set(o)})},t.start=function(i){const s=[];return A(e,(r,o)=>{if(l.und(i))s.push(r.start());else{const a=this._getProps(i,r,o);a&&s.push(r.start(a))}}),s},t.stop=function(){return A(e,i=>i.stop(...arguments)),this},t.update=function(i){return A(e,(s,r)=>s.update(this._getProps(i,s,r))),this};const n=function(i,s,r){return l.fun(i)?i(r,s):i};return t._getProps=n,t};function cr(e,t,n){const i=l.fun(t)&&t;i&&!n&&(n=[]);const s=m.useMemo(()=>i||arguments.length==3?ur():void 0,[]),r=m.useRef(0),o=Fn(),a=m.useMemo(()=>({ctrls:[],queue:[],flush(g,S){const d=hn(g,S);return r.current>0&&!a.queue.length&&!Object.keys(d).some(E=>!g.springs[E])?yt(g,S):new Promise(E=>{Jn(g,d),a.queue.push(()=>{E(yt(g,S))}),o()})}}),[]),c=m.useRef([...a.ctrls]),u=m.useRef([]),p=en(e)||0;m.useMemo(()=>{A(c.current.slice(e,p),g=>{Qs(g,s),g.stop(!0)}),c.current.length=e,h(p,e)},[e]),m.useMemo(()=>{h(0,Math.min(p,e))},n);function h(g,S){for(let d=g;d<S;d++){const f=c.current[d]||(c.current[d]=new ar(null,a.flush)),E=i?i(d,f):t[d];E&&(u.current[d]=nr(E))}}const _=c.current.map((g,S)=>hn(g,u.current[S])),w=m.useContext(or),v=en(w),y=w!==v&&$s(w);Ot(()=>{r.current++,a.ctrls=c.current;const{queue:g}=a;g.length&&(a.queue=[],A(g,S=>S())),A(c.current,(S,d)=>{s==null||s.add(S),y&&S.start({default:w});const f=u.current[d];f&&(Xs(S,f.ref),S.ref?S.queue.push(f):S.start(f))})}),zn(()=>()=>{A(a.ctrls,g=>g.stop(!0))});const b=_.map(g=>({...g}));return s?[b,s]:b}function lr(e,t){const n=l.fun(e),[[i],s]=cr(1,n?e:[e],n?t||[]:t);return n||arguments.length==2?[i,s]:i}var dr=class extends Ft{constructor(e,t){super(),this.source=e,this.idle=!0,this._active=new Set,this.calc=Se(...t);const n=this._get(),i=ht(n);Tt(this,i.create(n))}advance(e){const t=this._get(),n=this.get();Y(t,n)||($(this).setValue(t),this._onChange(t,this.idle)),!this.idle&&mn(this._active)&&ot(this)}_get(){const e=l.arr(this.source)?this.source.map(z):B(z(this.source));return this.calc(...e)}_start(){this.idle&&!mn(this._active)&&(this.idle=!1,A(Xe(this),e=>{e.done=!1}),W.skipAnimation?(x.batchedUpdates(()=>this.advance()),ot(this)):qe.start(this))}_attach(){let e=1;A(B(this.source),t=>{Q(t)&&Le(t,this),gt(t)&&(t.idle||this._active.add(t),e=Math.max(e,t.priority+1))}),this.priority=e,this._start()}_detach(){A(B(this.source),e=>{Q(e)&&Ne(e,this)}),this._active.clear(),ot(this)}eventObserved(e){e.type=="change"?e.idle?this.advance():(this._active.add(e.parent),this._start()):e.type=="idle"?this._active.delete(e.parent):e.type=="priority"&&(this.priority=B(this.source).reduce((t,n)=>Math.max(t,(gt(n)?n.priority:0)+1),0))}};function fr(e){return e.idle!==!1}function mn(e){return!e.size||Array.from(e).every(fr)}function ot(e){e.idle||(e.idle=!0,A(Xe(e),t=>{t.done=!0}),Ve(e,{type:"idle",parent:e}))}W.assign({createStringInterpolator:Dn,to:(e,t)=>new dr(e,t)});var hr=["primitive"].concat(Object.keys(Ci).filter(e=>/^[A-Z]/.test(e)).map(e=>e[0].toLowerCase()+e.slice(1)));W.assign({createStringInterpolator:Dn,colors:ls,frameLoop:"demand"});Li(()=>{x.advance()});var mr=js(hr,{applyAnimatedValues:Oi}),wr=mr.animated;function br({initialPosition:e,dragZ:t,dragPlaneWorldZ:n,dropTarget:i,dropSnapPosition:s,dropThreshold:r,bounds:o,isEnabled:a,setDragging:c,onDrop:u,registerDragStart:p}){const{camera:h,controls:_,size:w}=_t(),v=m.useRef(!1),y=m.useRef(!1),b=m.useRef(new ze(0,0)),g=m.useRef(!1),S=m.useMemo(()=>new Ti,[]),d=m.useMemo(()=>new D,[]),f=n??t,E=m.useMemo(()=>new Ui(new D(0,0,1),-f),[f]),[T,I]=m.useState(e.toArray()),[M,P]=lr(()=>({position:T,config:{tension:200,friction:20}}),[T]),V=m.useCallback((ie,he)=>[Math.max(o.minX,Math.min(o.maxX,ie)),Math.max(o.minY,Math.min(o.maxY,he)),t],[o,t]),R=m.useCallback(()=>{y.current||v.current||a&&(v.current=!0,g.current=!0,c(!0),document.body.style.cursor="grabbing",_&&(_.enabled=!1))},[c,_,a]),F=m.useCallback(ie=>{if(!v.current)return;const he=new ze((ie.clientX-w.left)/w.width*2-1,-((ie.clientY-w.top)/w.height)*2+1);if(S.setFromCamera(he,h),S.ray.intersectPlane(E,d),g.current){const kt=M.position.get();b.current.set(d.x-kt[0],d.y-kt[1]),g.current=!1}const Ze=d.x-b.current.x,zt=d.y-b.current.y,ri=V(Ze,zt);P.set({position:ri})},[h,w,S,d,E,V,P,M.position]),H=m.useCallback(()=>{if(!v.current||y.current)return;v.current=!1,c(!1),document.body.style.cursor="auto",_&&(_.enabled=!0);const ie=M.position.get(),he=new D(ie[0],ie[1],0),Ze=new D(i.x,i.y,0);he.distanceTo(Ze)<r?(y.current=!0,I(s??[i.x,i.y,i.z]),u()):I(e.toArray())},[c,_,M.position,i,s,r,e,u]);m.useEffect(()=>(p(R),()=>p(null)),[p,R]),m.useEffect(()=>(window.addEventListener("pointermove",F),window.addEventListener("pointerup",H),()=>{window.removeEventListener("pointermove",F),window.removeEventListener("pointerup",H)}),[F,H]);const Ke=m.useCallback(()=>{R()},[R]),ii=m.useCallback(()=>{!v.current&&!y.current&&a&&(document.body.style.cursor="grab")},[a]),si=m.useCallback(()=>{v.current||(document.body.style.cursor="auto")},[]);return{spring:M,handlePointerDown:Ke,handlePointerOver:ii,handlePointerOut:si}}export{yr as E,_r as W,br as a,wr as b,vr as u};
