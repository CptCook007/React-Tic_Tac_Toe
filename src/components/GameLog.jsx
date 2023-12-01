function Log({playerLog}){
    return(
        <>
            <h2>Logs</h2>
           {playerLog.map((log,logIndex)=>(<li key={logIndex}>{log.player} in {log.square.row+1},{log.square.col+1}</li>))}
        </>
    )
}
export default Log;