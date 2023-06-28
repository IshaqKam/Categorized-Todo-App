import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

interface ExpandIconButtonProps extends IconButtonProps {
  expand: boolean | undefined;
}

const ExpandIconButton = styled(IconButton)<ExpandIconButtonProps>(
  ({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  })
);

export default ExpandIconButton;
