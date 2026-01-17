import { Box, Stack, Typography } from '@mui/material';
import { SectionProps } from './types';

const Section = ({ children, title, caption, headerSlot }: SectionProps) => {
  return (
    <Box>
      <Stack>
        {title && (
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Stack direction="column" gap={0.5}>
              <Typography variant="h4">{title}</Typography>
              {caption && (
                <Typography variant="caption" color="textDisabled">
                  {caption}
                </Typography>
              )}
            </Stack>
            {headerSlot && (
              <Stack direction="row" gap={1}>
                {headerSlot}
              </Stack>
            )}
          </Stack>
        )}
        <Box>{children}</Box>
      </Stack>
    </Box>
  );
};

export default Section;
