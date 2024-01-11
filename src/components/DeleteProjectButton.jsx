import { FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { GET_PROJECTS } from '../queries/projectQueries'
import { DELETE_PROJECT } from '../mutations/projectMutation'
import { useMutation } from '@apollo/client'

const DeleteProjectButton = ({ projectId }) => {
  const navigate = useNavigate()

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: () => navigate('/'),
    // update(cache, { data: deleteProject }) {
    //   const { projects } = cache.readQuery({ query: GET_PROJECTS })
    //   cache.writeQuery({
    //     query: GET_PROJECTS,
    //     data: {
    //       projects: projects.filter(
    //         (project) => project.id !== deleteProject.id
    //       ),
    //     },
    //   })
    // },
    refetchQueries: [{ query: GET_PROJECTS }],
  })

  return (
    <div className="d-flex mt-5 ms-auto">
      <button className="btn btn-danger m-2" onClick={deleteProject}>
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  )
}
export default DeleteProjectButton
