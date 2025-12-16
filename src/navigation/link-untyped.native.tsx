import { Link } from '@react-navigation/native'

export const LinkUntyped = ({ pathname, query, ...props }: any) => (
  <Link {...props} screen={pathname} params={query} />
)
