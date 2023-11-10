import { toast } from 'react-toastify';
import { BsClockHistory } from 'react-icons/bs';
import Image from 'next/image';

export type TOAST_TYPE =
  | 'QUEUE'
  | 'QUEUE_CLAIM'
  | 'CLEAR'
  | 'SUCCESS'
  | 'SUCCESS_CLAIM'
  | 'ERROR'
  | 'WRONG_NETWORK'
  | 'WALLET_CONNET'
  | 'WALLET_DISCONNECT'
  | 'LIMIT_EXCEED';

export const triggerToast = (type: TOAST_TYPE, extraContent?: string) => {
  if (type === 'CLEAR') {
    toast.dismiss();
  }

  if (type === 'QUEUE') {
    toast.info(`Processing ticket purchase`, {
      hideProgressBar: true,
      autoClose: 5000,
      icon: () => <BsClockHistory style={{ width: '44px', height: '44px' }} />,
    });
  }

  if (type === 'QUEUE_CLAIM') {
    toast.info(`Claiming multi-round prizes`, {
      hideProgressBar: true,
      autoClose: 5000,
      icon: () => <BsClockHistory style={{ width: '44px', height: '44px' }} />,
    });
  }

  if (type === 'SUCCESS_CLAIM') {
    if (extraContent) {
      toast.success(`${extraContent}`, {
        hideProgressBar: true,
        icon: () => (
          <Image
            src={'/images/toast/tx-success.png'}
            alt=""
            width={44}
            height={44}
          />
        ),
      });
    }
  }

  if (type === 'SUCCESS') {
    if (extraContent) {
      const data = extraContent
        .split(/[\s#]+/)
        .filter(element => element !== '');
      toast.success(`Ticket #${data[0]} in round #${data[1]}`, {
        hideProgressBar: true,
        icon: () => (
          <Image
            src={'/images/toast/tx-success.png'}
            alt=""
            width={44}
            height={44}
          />
        ),
      });
    }
  }

  if (type === 'WALLET_CONNET') {
    toast.success(
      <div>
        <p>Wallet Connected</p>
        <p className="Toastify__toast-submsg">
          Connected to wallet
          {extraContent ? (
            <>
              <br />
              {extraContent}
            </>
          ) : null}
        </p>
      </div>,
      {
        hideProgressBar: true,
        toastId: type,
        icon: () => (
          <Image
            src={'/images/toast/tx-wallet.png'}
            alt=""
            width={44}
            height={44}
          />
        ),
      }
    );
  }

  if (type === 'WALLET_DISCONNECT') {
    toast.error(
      <div>
        <p>Wallet Disconnected</p>
        <p className="Toastify__toast-submsg">
          Disconnected from wallet
          {extraContent ? (
            <>
              <br />
              {extraContent}
            </>
          ) : null}
        </p>
      </div>,
      {
        hideProgressBar: true,
        icon: () => (
          <Image
            src={'/images/toast/tx-wallet-disconnect.png'}
            alt=""
            width={44}
            height={44}
          />
        ),
      }
    );
  }

  if (type === 'ERROR') {
    toast.error(extraContent ?? 'Transaction Failed', {
      hideProgressBar: true,
      icon: () => (
        <Image
          src={'/images/toast/tx-error.png'}
          alt=""
          width={44}
          height={44}
        />
      ),
    });
  }

  if (type === 'WRONG_NETWORK') {
    toast.error(
      <div>
        <p>Wrong Network</p>
        <p className="Toastify__toast-submsg">Switch to Polygon Network</p>
      </div>,
      {
        hideProgressBar: true,
        icon: () => (
          <Image
            src={'/images/toast/tx-error.png'}
            alt=""
            width={44}
            height={44}
          />
        ),
      }
    );
  }

  if (type === 'LIMIT_EXCEED') {
    toast.error(
      <div>
        <p className="Toastify__toast-submsg">
          There are only ${extraContent} of tokens left for purchase in the
          private sale. Please change the amount to continue.
        </p>
      </div>,
      {
        hideProgressBar: true,
        icon: () => (
          <div
            style={{
              width: 44,
              height: 44,
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'white',
              borderRadius: '100%',
            }}
          >
            <Image src={'/svg/warning.svg'} alt="" width={44} height={44} />
          </div>
        ),
      }
    );
  }
};

export const updateToast = (type: TOAST_TYPE, extraContent?: string) => {
  if (type === 'WALLET_CONNET') {
    toast.update(type, {
      render: (
        <div>
          <p>Wallet Connected</p>
          <p className="Toastify__toast-submsg">
            Connected to wallet
            <br />
            {extraContent}
          </p>
        </div>
      ),
    });
  }
};
