export const AnimalT = ({nombre, cientifico, latitud, longitud, region, status})=>{
    return(
        <>
            <td>{nombre}</td>
            <td>{cientifico}</td>
            <td>{latitud}</td>
            <td>{longitud}</td>
            <td>{region}</td>
        </>
    )
}