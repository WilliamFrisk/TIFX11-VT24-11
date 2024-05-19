from mmpose.apis import MMPoseInferencer
import numpy as np

def angle_between_points(p1, p2, p3):
    v1 = np.array(p2) - np.array(p1)
    v2 = np.array(p3) - np.array(p1)
    dot_product = np.dot(v1, v2)
    magnitudes = np.linalg.norm(v1) * np.linalg.norm(v2)
    angle_rad = np.arccos(dot_product / magnitudes)
    angle_deg = np.degrees(angle_rad)

    return angle_deg

def calculate_avg_angle(rel_points1: list, mid_points: list, rel_points2: list) -> float:
    all_angles = []
    for i in range(min(len(rel_points1), len(mid_points), len(rel_points2))):
        all_angles.append(angle_between_points(mid_points[i], rel_points1[i], rel_points2[i]))

    return sum(all_angles) / len(all_angles)

def calculate_angles_from_inference_results(results: list):
    right_knee_avg_angle = calculate_avg_angle([result['predictions'][0][0]['keypoints'][1] for result in results],
                                  [result['predictions'][0][0]['keypoints'][2] for result in results],
                                  [result['predictions'][0][0]['keypoints'][3] for result in results])
    
    left_knee_avg_angle = calculate_avg_angle([result['predictions'][0][0]['keypoints'][4] for result in results],
                                  [result['predictions'][0][0]['keypoints'][5] for result in results],
                                  [result['predictions'][0][0]['keypoints'][6] for result in results])
    
    right_hip_avg_angle = calculate_avg_angle([result['predictions'][0][0]['keypoints'][2] for result in results],
                                  [result['predictions'][0][0]['keypoints'][1] for result in results],
                                  [result['predictions'][0][0]['keypoints'][7] for result in results])
    
    left_hip_avg_angle = calculate_avg_angle([result['predictions'][0][0]['keypoints'][5] for result in results],
                                  [result['predictions'][0][0]['keypoints'][4] for result in results],
                                  [result['predictions'][0][0]['keypoints'][7] for result in results])

    left_elbow_avg_angle = calculate_avg_angle([result['predictions'][0][0]['keypoints'][11] for result in results],
                                  [result['predictions'][0][0]['keypoints'][12] for result in results],
                                  [result['predictions'][0][0]['keypoints'][13] for result in results])
    
    right_elbow_avg_angle = calculate_avg_angle([result['predictions'][0][0]['keypoints'][14] for result in results],
                                  [result['predictions'][0][0]['keypoints'][15] for result in results],
                                  [result['predictions'][0][0]['keypoints'][16] for result in results])

    return {
    "left_knee": round(left_knee_avg_angle, 2),
    'right_knee': round(right_knee_avg_angle, 2),
    'left_elbow': round(left_elbow_avg_angle, 2),
    'right_elbow': round(right_elbow_avg_angle, 2),
    'left_hip': round(left_hip_avg_angle, 2),
    'right_hip': round(right_hip_avg_angle, 2)
    }


def standard_motionbert_inference(video):
    inferencer = MMPoseInferencer(pose3d='human3d', device='cpu')

    result_generator = inferencer(video, vis_out_dir='results', show=False)
    return calculate_angles_from_inference_results([result for result in result_generator])


def custom_rtmpose_motionbert_inference(video):
    inferencer = MMPoseInferencer(pose2d='rtmpose-m_8xb256-420e_coco-256x192',
                                  pose2d_weights='app/model/checkpoints/bad_rtmpose_epoch_390.pth',
                                  pose3d='human3d',
                                  device='cpu')

    result_generator = inferencer(video, vis_out_dir='results', show=False)
    return calculate_angles_from_inference_results([result for result in result_generator])


def infere(video):
    #return custom_rtmpose_motionbert_inference(video)
    return standard_motionbert_inference(video)


if __name__ == "__main__":
    video_path = 'uploads/video.mp4'
    infere(video_path)
