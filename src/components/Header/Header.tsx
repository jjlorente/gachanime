import './Header.css'

interface HeaderProps {
  userData: any;
}

export const Header: React.FC<HeaderProps> = ({ userData }) => {
  return (
    <div className='Header'>
        <h1 className='title-header'>GACHANIME</h1>
    </div>
  )
}
