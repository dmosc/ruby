import React from 'react';
import Sketch from 'react-p5';
import ml5 from 'ml5';
import {Card} from 'antd';

const Camera = () => {
  let video;
  let poseNet;
  let pose;
  let skeleton;

  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(500, 500).parent(canvasParentRef);
    video = p5.createCapture(p5.VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, () => ({}));
    poseNet.on('pose', gotPoses);
  };

  const gotPoses = (poses) => {
    if (poses.length > 0) {
      pose = poses[0].pose;
      skeleton = poses[0].skeleton;
    }
  };

  const draw = (p5) => {
    p5.image(video, 0, 0);

    if (pose) {
      const eyeR = pose.rightEye;
      const eyeL = pose.leftEye;
      const d = p5.dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
      p5.fill(255, 0, 0);
      p5.ellipse(pose.nose.x, pose.nose.y, d);
      p5.fill(0, 0, 255);
      p5.ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
      p5.ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);

      for (let i = 0; i < pose.keypoints.length; i++) {
        const x = pose.keypoints[i].position.x;
        const y = pose.keypoints[i].position.y;
        p5.fill(0, 255, 0);
        p5.ellipse(x, y, 16, 16);
      }

      for (let i = 0; i < skeleton.length; i++) {
        const a = skeleton[i][0];
        const b = skeleton[i][1];
        p5.strokeWeight(2);
        p5.stroke(255);
        p5.line(a.position.x, a.position.y, b.position.x, b.position.y);
      }
    }
  };

  return (
    <Card>
      <Sketch setup={setup} draw={draw} />
    </Card>
  );
};

export default Camera;
