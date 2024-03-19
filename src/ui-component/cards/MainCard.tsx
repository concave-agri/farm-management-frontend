import { forwardRef, ReactNode, Ref } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from '@mui/material';

interface MainCardProps {
  border?: boolean;
  boxShadow?: boolean;
  children?: ReactNode;
  content?: boolean;
  contentClass?: string;
  contentSX?: object;
  darkTitle?: boolean;
  secondary?: ReactNode | string | object;
  shadow?: string;
  sx?: object;
  title?: ReactNode; // Ensure title is of type ReactNode
}

const headerSX = {
  '& .MuiCardHeader-action': { marginRight: 0 },
};

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    }: any,
    ref: Ref<HTMLDivElement>
  ) => {
    const theme: any = useTheme();

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.primary[200] + 25,
          ':hover': {
            boxShadow: boxShadow
              ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)'
              : 'inherit',
          },
          ...sx,
        }}
      >
        {title && (
          <CardHeader
            sx={headerSX}
            title={
              darkTitle ? <Typography variant="h3">{title}</Typography> : title
            }
            action={secondary}
          />
        )}

        {title && <Divider />}

        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

MainCard.displayName = 'MainCard';

export default MainCard;