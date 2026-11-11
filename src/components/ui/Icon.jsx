import { publicAsset } from '../../utils/publicAsset'

export default function Icon({ name, className = '' }) {
  return (
    <svg className={`icon ${className}`.trim()} aria-hidden="true">
      <use href={`${publicAsset('icons.svg')}#${name}-icon`} />
    </svg>
  )
}
