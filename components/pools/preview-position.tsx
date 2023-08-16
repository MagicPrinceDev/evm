import { FeeTier, Token } from '@/types/common';
import {
  Button,
  Dialog,
  useMediaQuery,
  Theme,
  DialogTitle,
  IconButton,
  DialogContent,
  Typography,
  Stack,
  Paper,
  Divider,
  Grid,
} from '@mui/material';
import { useState } from 'react';
import { IoIosClose } from 'react-icons/io';

type PreviewPositionProps = {
  canSpendTokens: boolean;
  tokenA: Token | null;
  tokenB: Token | null;
  feeTier: FeeTier;
  amountA: number;
  amountB: number;
  minPrice: number;
  maxPrice: number;
  price: number;
};

const PreviewPosition = ({
  canSpendTokens,
  tokenA,
  tokenB,
  feeTier,
  amountA,
  amountB,
  minPrice,
  maxPrice,
  price,
}: PreviewPositionProps) => {
  const isMdAndUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBackdropClose = (event: React.SyntheticEvent, reason: string) => {
    if (reason === 'backdropClick') return;
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="large"
        fullWidth
        disabled={!canSpendTokens}
        onClick={handleOpen}
      >
        Preview Position
      </Button>

      <Dialog
        open={open}
        onClose={handleBackdropClose}
        maxWidth="lg"
        fullWidth={!isMdAndUp}
        PaperProps={{
          variant: 'outlined',
        }}
      >
        <DialogTitle>
          <b>Position Preview</b>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <IoIosClose />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack
            direction="column"
            spacing={1}
          >
            <Typography variant="h6">
              {tokenA?.symbol}/{tokenB?.symbol}
            </Typography>

            <Paper
              variant="outlined"
              sx={{ p: 2, minWidth: { xs: '100%', md: '400px' } }}
            >
              <Stack
                direction="column"
                spacing={2}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography variant="body1">{tokenA?.symbol}</Typography>
                  <Typography variant="body1">{amountA.toLocaleString()} </Typography>
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography variant="body1">{tokenB?.symbol}</Typography>
                  <Typography variant="body1">{amountB.toLocaleString()} </Typography>
                </Stack>

                <Divider />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                >
                  <Typography variant="body1">Fee Tier</Typography>
                  <Typography variant="body1">{feeTier.value / 10000}%</Typography>
                </Stack>
              </Stack>
            </Paper>

            <Typography variant="body1">
              <b>Selected Range</b>
            </Typography>

            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
            >
              <Paper
                variant="outlined"
                sx={{ p: 2, minWidth: '49%' }}
              >
                <Stack
                  direction="column"
                  justifyContent="center"
                >
                  <Typography
                    variant="body2"
                    color="GrayText"
                    textAlign="center"
                  >
                    Min Price
                  </Typography>
                  <Typography
                    variant="body1"
                    textAlign="center"
                  >
                    {minPrice.toLocaleString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="GrayText"
                    textAlign="center"
                  >
                    {tokenB?.symbol} / {tokenA?.symbol}
                  </Typography>
                </Stack>
              </Paper>

              <Paper
                variant="outlined"
                sx={{ p: 2, minWidth: '49%' }}
              >
                <Stack
                  direction="column"
                  justifyContent="center"
                >
                  <Typography
                    variant="body2"
                    color="GrayText"
                    textAlign="center"
                  >
                    Max Price
                  </Typography>
                  <Typography
                    variant="body1"
                    textAlign="center"
                  >
                    {maxPrice.toLocaleString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="GrayText"
                    textAlign="center"
                  >
                    {tokenB?.symbol} / {tokenA?.symbol}
                  </Typography>
                </Stack>
              </Paper>
            </Stack>

            <Paper
              variant="outlined"
              sx={{ p: 2 }}
            >
              <Stack
                direction="column"
                justifyContent="center"
              >
                <Typography
                  variant="body2"
                  color="GrayText"
                  textAlign="center"
                >
                  Price
                </Typography>
                <Typography
                  variant="body1"
                  textAlign="center"
                >
                  {price.toLocaleString()}
                </Typography>
                <Typography
                  variant="body2"
                  color="GrayText"
                  textAlign="center"
                >
                  {tokenB?.symbol} / {tokenA?.symbol}
                </Typography>
              </Stack>
            </Paper>

            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              Add Liquidity
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PreviewPosition;