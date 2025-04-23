import UserIcon from './user-icon'

export default function UserBadge({
  account,
  size = 18,
}: { account: string; size?: number }) {
  return (
    <>
      <UserIcon account={account} size={size} inline />
      {account}
    </>
  )
}
