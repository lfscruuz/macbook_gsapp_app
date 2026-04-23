import { PresentationControls } from "@react-three/drei";
import { useRef } from "react"
import MacBookModel16 from "../models/Macbook-16";
import MacBookModel14 from "../models/Macbook-14";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group, opacity) => {
  if(!group) return;

  group.traverse((child) => {
    if(child.isMesh) {
      child.material.transparent = true;
      gsap.to(child.material, {opacity, duration: ANIMATION_DURATION})
    }
  })
};

const moveGroup = (group, x) => {
  if(!group) return;

  gsap.to(group.position, {x, ANIMATION_DURATION});
};

const ModelSwitcher = ({scale, isMobile}) => {
  const smallMacBookRef = useRef();
  const largeMacBookRef = useRef();
  const showLargeMacBook = scale ===  0.08 || scale === 0.05;

  console.log(showLargeMacBook);

  useGSAP(() => {
    if(showLargeMacBook){
      moveGroup(smallMacBookRef.current, -OFFSET_DISTANCE);
      moveGroup(largeMacBookRef.current, 0);
      
      fadeMeshes(smallMacBookRef.current, 0);
      fadeMeshes(largeMacBookRef.current, 1);
      

    } else {
      moveGroup(largeMacBookRef.current, OFFSET_DISTANCE);
      moveGroup(smallMacBookRef.current, 0);
  
      fadeMeshes(largeMacBookRef.current, 0);
      fadeMeshes(smallMacBookRef.current, 1);
    }

  }, [scale]);

  const controlsConfig = {
    snap: true,
    speed: 1.75,
    polar: [-Math.PI, Math.PI]
  }

  return (
    <>
      <PresentationControls {...controlsConfig}>
        <group ref={largeMacBookRef}>
          <MacBookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>
      <PresentationControls {...controlsConfig}>
        <group ref={smallMacBookRef}>
          <MacBookModel14 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>
  )
}

export default ModelSwitcher