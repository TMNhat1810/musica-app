import { Typography } from '@mui/material';

function autoLink(text: string) {
  const urlRegex = /(\bhttps?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      );
    }
    return part;
  });
}

export default function AutoLinkText({ text }: { text: string }) {
  return <Typography sx={{ whiteSpace: 'pre-line' }}>{autoLink(text)}</Typography>;
}
