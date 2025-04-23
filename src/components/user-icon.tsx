import { Avatar } from '@mantine/core'

export default function UserIcon({
  account,
  size = 18,
  inline = false,
}: { account: string; size?: number; inline?: boolean }) {
  return (
    <Avatar
      src={`https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(account)}`}
      alt={account}
      size={size}
      radius="xl"
      component="span"
      style={
        inline ? { marginRight: 8, marginLeft: 3, display: 'inline-block' } : {}
      }
    />
  )
}
