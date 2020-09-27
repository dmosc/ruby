import {Router} from 'express';
import ytdl from 'ytdl-core';

const files = Router();

files.post('/download', (req, res) => {
  const url = req.body.url;
  res.header('Content-Disposition', 'attachment; filename="video.mp4"');
  ytdl(url, {format: 'mp4'}).pipe(res);
});

export default files;
