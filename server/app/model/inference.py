from mmpose.apis import MMPoseInferencer


def standard_motionbert_inference(video):
    inferencer = MMPoseInferencer(pose3d='human3d', device='cpu')

    result_generator = inferencer(video, vis_out_dir='test_results')
    results = [result for result in result_generator]


def custom_rtmpose_motionbert_inference(video):
    inferencer = MMPoseInferencer(pose2d='rtmpose-m_8xb256-420e_coco-256x192',
                                  pose2d_weights='app/model/checkpoints/bad_rtmpose_epoch_390.pth',
                                  pose3d='human3d',
                                  device='cpu')

    result_generator = inferencer(video, vis_out_dir='test_results')
    results = [result for result in result_generator]


def infere(video):
    #custom_rtmpose_motionbert_inference(video)
    standard_motionbert_inference(video)


if __name__ == "__main__":
    video_path = 'app/model/test_videos/marcus-1s.mp4'
    infere(video_path)
