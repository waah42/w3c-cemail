import {
  Button,
  Heading,
  Box,
  Flex,
  Text,
  Textarea,
  Spacer,
} from '@chakra-ui/react';
import { NavMessageState, State } from 'contexts/State';

import {
  CgChevronLeft,
  CgTime,
  CgUser,
  CgMailReply,
  CgMailForward,
  CgTrash,
} from 'react-icons/cg';
import { createRef, useEffect, useState } from 'react';

type MessageScreenProps = {
  closeMessage: () => void;
  state: State;
};

function MessageScreen(props: MessageScreenProps) {
  const [replyVisibility, setReplyVisibility] = useState<boolean>();
  const [replyValue, setReplyValue] = useState('');
  const replyRef = createRef<HTMLDivElement>();

  useEffect(() => {
    if (replyVisibility) {
      replyRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [replyRef, replyVisibility]);

  const handleReplyInputChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReplyValue(e.target.value);
  };

  const submitReply = () => {
    setReplyVisibility(false);
  };

  const nav = props.state.nav as NavMessageState;

  return (
    <Flex direction="row" padding={4}>
      <Button onClick={props.closeMessage} flexShrink={0}>
        <CgChevronLeft />
      </Button>
      <Flex direction="column" marginLeft={4}>
        {nav.message && (
          <>
            <Heading>{nav.message.subject}</Heading>
            <Flex color="gray" alignItems="center">
              <CgUser />
              <Text marginRight={1}>
                {nav.message.sender} on{' '}
                {Intl.DateTimeFormat(navigator.language, {
                  dateStyle: 'long',
                  timeStyle: 'long',
                }).format(nav.message.date)}
              </Text>
              <CgTime />
            </Flex>
            <Text flexGrow={1} marginTop={4}>
              {nav.message.content}
            </Text>
          </>
        )}

        {!replyVisibility && (
          <Box marginTop={10}>
            <Button marginRight={4} onClick={() => setReplyVisibility(true)}>
              <CgMailReply size={24} /> Reply
            </Button>
            <Button>
              <CgMailForward size={24} /> Forward
            </Button>
          </Box>
        )}

        {replyVisibility && (
          <Box
            marginTop={10}
            ref={replyRef}
            boxShadow="md"
            paddingLeft={4}
            paddingRight={4}
            paddingBottom={4}
            paddingTop={2}
            border="1px solid #eee"
          >
            <Flex alignItems="center" color="gray">
              <CgMailReply size={20} /> {nav.message?.sender}
            </Flex>
            <Textarea
              border={0}
              autoFocus
              value={replyValue}
              onChange={handleReplyInputChange}
              resize="vertical"
              size="lg"
            />
            <Flex>
              <Button colorScheme="blue" onClick={() => submitReply()}>
                Send
              </Button>
              <Spacer />
              <Button onClick={() => setReplyVisibility(false)}>
                <CgTrash size={24} />
              </Button>
            </Flex>
          </Box>
        )}
      </Flex>
    </Flex>
  );
}

export default MessageScreen;
