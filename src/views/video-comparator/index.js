import React, {useState, useEffect} from 'react';
import {Button, Card, Col, Row, Skeleton} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import {Link, useLocation} from 'react-router-dom';
import Sketch from 'react-p5';
import ml5 from 'ml5';
import {poseSimilarity} from 'posenet-similarity';
import {api} from 'client';

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

  return <Sketch setup={setup} draw={draw} />;
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

  return <Sketch setup={setup} draw={draw} />;
};

const Loading = ({title}) => (
  <Card key={Math.random()} title={title}>
    <Skeleton.Image loading />
    <Skeleton loading key={Math.random()} />
  </Card>
);

const VideoComparator = () => {
  const [video, setVideo] = useState(undefined);

  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const res = await api.post(
          '/files/download',
          {
            url: `https://www.youtube.com/watch?v=${location.state?.videoId}`,
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
      <Row style={{marginBottom: 10}}>
        <Link to={{pathname: '/', state: {}}}>
          <Button type="primary" icon={<RollbackOutlined />}>
            Return
          </Button>
        </Link>
      </Row>
      <Row gutter={15}>
        <Col span={12}>
          <Card>
            {video ? (
              <VideoPlayer videoFile={video} />
            ) : (
              <Loading title="Downloading video..." />
            )}
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            {video ? (
              <Camera />
            ) : (
              <Loading title="Rendering visual analysis..." />
            )}
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default VideoComparator;
