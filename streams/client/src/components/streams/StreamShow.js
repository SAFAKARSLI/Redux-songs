import React, {useEffect, useRef} from "react";
import { connect } from "react-redux";
import FlvJs from "flv.js";
import { fetchStream } from "../../actions";


const StreamShow = (props) => {

    const videoRef = useRef();
    const player = useRef(undefined);
    const {id} = props.match.params;

    useEffect(()=>{
        props.fetchStream(id)

    }, [])

    useEffect(() => {
        buildPlayer()
        console.log(player.current)
        
        return () => {
            if(player.current) {

                player.current.unload();
            }
        }
    })


    const buildPlayer = () => {

        if(player.current || !props.stream) {
            return;
        }

        player.current = FlvJs.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        })

        player.current.attachMediaElement(videoRef.current)
        player.current.load();

    }

    if(!props.stream) {
        return <div>Loading...</div>
    }

    const {title, description} = props.stream;

    return (
        <div>
            <video ref={videoRef} style={{ width: "100%" }} controls />
            <h1>{title}</h1>
            <h5>{description}</h5>
        </div>
    )
}


const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchStream})(StreamShow);