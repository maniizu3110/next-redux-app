import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import { startClock } from '../src/timer/actions'
import Examples from '../components/examples'
//試験的にfirebaseでimportしたものたち
import firebase from '../firebase/initFirebase'
import WriteToCloudFirestore from '../components/cloudFireStore/write'
import ReadDataFromCloudFirestore from '../components/cloudFireStore/read'

firebase()
const Index = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(startClock())
  }, [dispatch])

  return (
    <>
      <WriteToCloudFirestore/>
      <ReadDataFromCloudFirestore/>
      <Examples />
      <Link href="/show-redux-state">
        <a>Click to see current Redux State</a>
      </Link>
    </>
  )
}

export default Index
