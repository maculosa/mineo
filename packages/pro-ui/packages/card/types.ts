export interface ProCardProps {
  title?: string
  description?: string
  loading?: boolean
  error?: string
  empty?: boolean
  emptyText?: string
  showHeader?: boolean
  showFooter?: boolean
  class?: string
}

export interface ProCardHeaderProps {
  title?: string
  description?: string
  extra?: any
  class?: string
}