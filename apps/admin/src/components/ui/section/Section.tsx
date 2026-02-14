import { Box, Stack, Typography } from '@mui/material';
import { SectionProps } from './types';

const Section = ({
  children,
  title,
  caption,
  headerSlot,
  contentBeforeSlot,
  contentAfterSlot,
}: SectionProps) => {
  return (
    <Box>
      <Stack direction="column" gap={4}>
        {title && (
          <Stack
            direction="row"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Stack direction="column" gap={1}>
              <Typography variant="h3">{title}</Typography>
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
        <Stack direction="column" gap={4}>
          {contentBeforeSlot && <Box>{contentBeforeSlot}</Box>}
          <Box>{children}</Box>
          {contentAfterSlot && <Box>{contentAfterSlot}</Box>}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Section;
