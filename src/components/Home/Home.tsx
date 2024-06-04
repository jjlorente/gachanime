import './Home.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const [_id, set_Id] = useState<string>('');
  const navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem("_id")) {
      const idUser = localStorage.getItem("_id");
      if(idUser)
      set_Id(idUser)
    } else {
      navigate("/")
    }
  }, [])

  return (
    <div className='Home'>
      {_id}
    </div>
  )
}
