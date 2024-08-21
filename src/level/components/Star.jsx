

import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Star(props) {
  const { nodes, materials } = useGLTF("./models/star.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        name="pCylinder3"
        castShadow
        receiveShadow
        geometry={nodes.pCylinder3.geometry}
        material={materials.blinn2SG}
      />
    </group>
  );
}

useGLTF.preload("./models/star.glb");
