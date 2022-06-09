import { useEffect } from 'react'
import {
  VStack,
  useDisclosure,
  Button,
  Text,
  HStack,
  Box,
} from '@chakra-ui/react'
import SelectWalletModal from './Modal'
import { useWeb3React } from '@web3-react/core'
import { Tooltip } from '@chakra-ui/react'
import { connectors } from '../utils/connectors'
import { truncateAddress } from '../utils/utils'

export default function WalletModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { account, activate, deactivate, active } = useWeb3React()

  const refreshState = () => {
    window.localStorage.setItem('provider', undefined)
  }

  const disconnect = () => {
    refreshState()
    deactivate()
  }

  useEffect(() => {
    const provider = window.localStorage.getItem('provider')
    if (provider) activate(connectors[provider])
  }, [])

  return (
    <>
      <HStack>
        {active && (
          <VStack justifyContent="flex-start" alignItems="flex-start">
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              padding="10px"
            >
              <HStack>
                <Tooltip label={account} placement="right">
                  <Text>{`Account: ${truncateAddress(account)}`}</Text>
                </Tooltip>
              </HStack>
            </Box>
          </VStack>
        )}

        <VStack>
          {!active ? (
            <Button onClick={onOpen}>Connect Wallet</Button>
          ) : (
            <Button onClick={disconnect}>Disconnect</Button>
          )}
        </VStack>
      </HStack>

      <SelectWalletModal isOpen={isOpen} closeModal={onClose} />
    </>
  )
}
