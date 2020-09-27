import React, {useState, useEffect} from 'react';
import {Card, Col, Row, Upload, Button, PageHeader} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import Sketch from 'react-p5';
import ml5 from 'ml5';
import {poseSimilarity} from 'posenet-similarity';
import client from 'client';

let cameraPose;
let videoPlayerPose;

const VideoPlayer = ({videoFile}) => {
  let video;
  let poseNet;
  let pose;
  let skeleton;

  const setup = (p5, canvasParentRef) => {
    video = p5
      .createVideo([videoFile], () => {
        video.loop();
        video.volume(0);
        video.showControls();
        video.size(500, 500);
      })
      .parent(canvasParentRef);

    poseNet = ml5.poseNet(video, () => ({}));
    poseNet.on('pose', gotPoses);
  };

  const gotPoses = (poses) => {
    if (poses.length > 0) {
      pose = poses[0].pose;
      skeleton = poses[0].skeleton;
    }
  };

  const draw = () => {
    if (pose) {
      videoPlayerPose = pose;

      if (videoPlayerPose && cameraPose) {
        const cosineSimilarity = poseSimilarity(videoPlayerPose, cameraPose, {
          strategy: 'cosineSimilarity',
        });
      }
    }
  };

  return (
    <Card>
      <Sketch setup={setup} draw={draw} />
    </Card>
  );
};

const Camera = () => {
  let video;
  let poseNet;
  let pose;
  let skeleton;

  const setup = (p5, canvasParentRef) => {
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
    p5.clear();
    p5.image(video, 0, 0);

    if (pose) {
      cameraPose = pose;
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

const VideoComparator = () => {
  const [video, setVideo] = useState(undefined);

  useEffect(() => {
    (async () => {
      try {
        const res = await client.post(
          '/files/download',
          {
            url: 'https://www.youtube.com/watch?v=qObzgUfCl28',
          },
          {responseType: 'blob'},
        );

        const url = URL.createObjectURL(res.data);
        setVideo(url);
      } catch (err) {
        return err;
      }
    })();
  }, []);

  return (
    <>
      <Row>
        <PageHeader title="Perfect Training" subTitle="High-end training" />
      </Row>
      <Row>
        <Col span={12}>{video && <VideoPlayer videoFile={video} />}</Col>
        <Col span={12}>{video && <Camera />}</Col>
      </Row>
    </>
  );
};

export default VideoComparator;
