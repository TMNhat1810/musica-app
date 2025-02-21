import { Box } from '@mui/material';
import { styles } from './style';
import CommentInput from '../CommentSection/CommentInput/CommentInput';
import CommentSection from '../CommentSection';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MediaServices } from '../../services';
import { Comment } from '../../common/interfaces';

export default function CommentContainer() {
  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Comment[]>([]);

  const uploadComment = async (content: string) => {
    if (!id || !content) return;
    MediaServices.uploadComment(id, content)
      .then((data) => {
        setComments([...comments, data]);
      })
      .catch();
  };

  useEffect(() => {
    if (!id) return;
    MediaServices.getCommentsByMediaId(id)
      .then((data) => setComments(data))
      .catch();
  }, [id]);

  return (
    <Box sx={styles.container}>
      <CommentInput submit={uploadComment} />
      <CommentSection data={comments} />
    </Box>
  );
}
