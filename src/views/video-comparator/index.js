import React, {useState, useEffect} from 'react';
import {Statistic, Button, Card, Col, Row, Skeleton, Tag, Spin} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import {Link, useLocation} from 'react-router-dom';
import Sketch from 'react-p5';
import ml5 from 'ml5';
import {poseSimilarity} from 'posenet-similarity';
import {api} from 'client';

let cameraPose;
let videoPlayerPose;
let cosineSimilarity = 0;

const VideoPlayer = ({videoFile}) => {
  let video;
  let poseNet;
  let pose;

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
    }
  };

  const draw = () => {
    if (pose) {
      videoPlayerPose = pose;

      if (videoPlayerPose && cameraPose) {
        cosineSimilarity = poseSimilarity(videoPlayerPose, cameraPose, {
          strategy: 'cosineSimilarity',
        });
        const cosineSimilarityTag = document.getElementById('similarity');
        const theOtherSimilarityTag = document.querySelector(
          '#root > section > section > div > div.ant-spin-nested-loading > div > div > div:nth-child(2) > div > div > div.ant-statistic > div.ant-statistic-content > span.ant-statistic-content-value > span',
        );
        cosineSimilarityTag.innerText = `${(cosineSimilarity * 100).toFixed(
          2,
        )}% similarity`;
        theOtherSimilarityTag.innerText = (cosineSimilarity * 100).toFixed(2);
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

        if (cosineSimilarity >= 0.9) {
          p5.fill(0, 255, 0);
        } else if (cosineSimilarity >= 0.7) {
          p5.fill(255, 255, 0);
        } else {
          p5.fill(255, 0, 0);
        }

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

  return <Sketch style={{width: '100%'}} setup={setup} draw={draw} />;
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
  }, [location]);

  return (
    <>
      <Row
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <Link to={{pathname: '/', state: {}}}>
          <Button type="primary" icon={<RollbackOutlined />}>
            Return
          </Button>
        </Link>
        <Tag id="similarity" color="purple">
          Waiting for video streams...
        </Tag>
      </Row>
      <Spin spinning={!video} tip="Loading...">
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
                <>
                  <Camera />
                  <Statistic
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'column',
                    }}
                    title="Similarity"
                    value="100"
                    prefix="%"
                  />
                </>
              ) : (
                <Loading title="Rendering visual analysis..." />
              )}
            </Card>
          </Col>
        </Row>
      </Spin>
    </>
  );
};

export default VideoComparator;
