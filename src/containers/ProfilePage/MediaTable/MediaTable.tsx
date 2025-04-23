import {
  Box,
  Container,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { styles } from './style';
import { useEffect, useState } from 'react';
import { Media } from '../../../common/interfaces';
import { UserServices } from '../../../services';
import { useParams } from 'react-router-dom';
import MediaRow from './MediaRow';

export default function MediaTable() {
  const { id } = useParams();
  const [medias, setMedias] = useState<Media[]>([]);

  useEffect(() => {
    if (id)
      UserServices.getUserMedia(id)
        .then((data) => setMedias(data.medias))
        .catch();
  }, [id]);

  return (
    <Box sx={styles.container}>
      <Container maxWidth="xl">
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell></TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
              {medias.map((media) => (
                <MediaRow key={media.id} media={media} />
              ))}
            </TableHead>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
