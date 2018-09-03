import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {SpecManager} from "./Models";

class App extends Component {
  render() {
    const patch = new PatchManager().getPatch();
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Helix Viewer</h1>
        </header>
          <Patch patch={patch}></Patch>
      </div>
    );
  }
}

class Patch extends Component {
    render() {
        const patch = this.props.patch;
        return(
            <div>
                <h1>Patch View {patch.data.meta.name}</h1>
                <ObjectTable object={patch.data.meta}/>
                <Tone tone={patch.data.tone}/>
            </div>
            );
    }
}

class Tone extends Component {
    render() {
        const tone = this.props.tone;
        return(
            <div>
                <div>Tone</div>
                <table>
                    <tr><td><ToneGlobal global={tone.global}/></td></tr>
                    <tr><td><Snapshots tone={tone}/></td></tr>
                    <tr><td><DSPs tone={tone}/></td></tr>
                </table>
            </div>
        )
    }
}

class ToneGlobal extends Component {
    render() {
        const global = this.props.global;
        return(
            <div>
                <h2>Global</h2>
                <table  class="table snapshot">
                    <tr><th>Tempo</th><td>{global["@tempo"]}</td></tr>
                </table>
            </div>
        )
    }
}

class Snapshots extends Component {
    render() {
        const tone = this.props.tone;
        return (
            <div>
                <h2>Snapshots</h2>
                <table class="table snapshot">
                    <tr>
                        <td><Snapshot snapshot={tone.snapshot0} number={0}/></td>
                        <td><Snapshot snapshot={tone.snapshot1} number={1}/></td>
                        <td><Snapshot snapshot={tone.snapshot2} number={2}/></td>
                        <td><Snapshot snapshot={tone.snapshot3} number={3}/></td>
                        <td><Snapshot snapshot={tone.snapshot4} number={4}/></td>
                        <td><Snapshot snapshot={tone.snapshot5} number={5}/></td>
                        <td><Snapshot snapshot={tone.snapshot6} number={6}/></td>
                        <td><Snapshot snapshot={tone.snapshot7} number={7}/></td>
                    </tr>
                </table>
            </div>
        );
    }
}

class DSPs extends Component {
    render() {
        const tone = this.props.tone;
        return (
            <div>
                <DSP dsp={tone.dsp0} number={0}/>
                <DSP dsp={tone.dsp1} number={1}/>
            </div>
        )
    }
}

class DSP extends Component {
    render() {
        const dsp = this.props.dsp;
        const number = this.props.number;
        return (
            <div>
                <h3>DSP {number}</h3>
                <DSPBlocks dsp={dsp}/>
            </div>
        )
    }
}

class DSPBlocks extends Component {
    render() {
        const dsp = this.props.dsp;
        return (
            <div>
                <h3>Blocks</h3>
                <table>
                    <tr>
                        <td><DSPBlock block={dsp.block0} number={0}/></td>
                        <td><DSPBlock block={dsp.block1} number={1}/></td>
                        <td><DSPBlock block={dsp.block2} number={2}/></td>
                        <td><DSPBlock block={dsp.block3} number={3}/></td>
                        <td><DSPBlock block={dsp.block4} number={4}/></td>
                        <td><DSPBlock block={dsp.block5} number={5}/></td>
                        <td><DSPBlock block={dsp.block6} number={6}/></td>
                        <td><DSPBlock block={dsp.block7} number={7}/></td>
                    </tr>
                </table>
            </div>
        )
    }
}

class DSPBlock extends Component {
    render() {
        const block = new SpecManager().createBlock(this.props.block);
        const number = this.props.number;
        if (block) {
            return (
                <div>
                    <h4>Block {number} - {block.name}</h4>
                    <ObjectTable object={block}/>
                </div>
            )
        } else {
            return <div/>
        }
    }
}

class ObjectTable extends Component {
    render() {
        const object = this.props.object;
        var rows = [];
        for (var _property in object) {
            rows.push(<tr><th>{_property}</th><td>{object[_property]}</td></tr>)
            ;
        }
        return (<table>{rows}</table>);
    }
}

class Snapshot extends Component {
    render() {
        const snapshot = this.props.snapshot;
        const number = this.props.number;
        return (
            <div>
                <h2>Snapshot {number}</h2>
                <table border="2">
                    <tr><th>Name</th><td>{snapshot["@name"]}</td></tr>
                </table>
                <SnapshotBlocks blocks={snapshot.blocks}/>
            </div>
        )
    }
}

class SnapshotBlocks extends Component {
    render() {
        const blocks = this.props.blocks;
        return (
            <div>
                <h2>Blocks</h2>
                <table border="2">
                    <tr><td><SnapshotBlocksDSP dsp={blocks.dsp0} number={0}/></td></tr>
                    <tr><td><SnapshotBlocksDSP dsp={blocks.dsp1} number={1}/></td></tr>
                </table>
            </div>
        )
    }
}

class SnapshotBlocksDSP extends Component {
    render() {
        const dsp = this.props.dsp;
        const number = this.props.number;
        return (
            <div>
                <h2>DSP {number}</h2>
                <SnapshotBlocksDSPBlock block={dsp.block0} number={0}/>
                <SnapshotBlocksDSPBlock block={dsp.block1} number={1}/>
                <SnapshotBlocksDSPBlock block={dsp.block2} number={2}/>
                <SnapshotBlocksDSPBlock block={dsp.block3} number={3}/>
                <SnapshotBlocksDSPBlock block={dsp.block4} number={4}/>
                <SnapshotBlocksDSPBlock block={dsp.block5} number={5}/>
                <SnapshotBlocksDSPBlock block={dsp.block6} number={6}/>
                <SnapshotBlocksDSPBlock block={dsp.block7} number={7}/>
            </div>
        )
    }
}

class SnapshotBlocksDSPBlock extends Component {
    render() {
        const block = this.props.block;
        const number = this.props.number;
        if (block) {
            return <div></div>
        } else {
            return (
                <div>
                    <text>Block {number} {block}</text>
                </div>
            )
        }
    }
}

class PatchManager {
    getPatch() {
        return(
            {
                "meta": {
                    "pbn": 0,
                    "original": 0,
                    "premium": 0
                },
                "version": 6,
                "data": {
                    "meta": {
                        "appversion": 39845888,
                        "song": null,
                        "application": "HX Edit",
                        "name": "Placater Ch. 1&2",
                        "modifieddate": 1530630986,
                        "author": "jaysadites",
                        "tnid": 3920732,
                        "band": null,
                        "build_sha": "41ed83b"
                    },
                    "device_version": 39845888,
                    "device": 2162689,
                    "tone": {
                        "snapshot6": {
                            "@pedalstate": 2,
                            "@valid": true,
                            "controllers": {
                                "dsp0": {
                                    "block3": {
                                        "Drive": {
                                            "@value": 1,
                                            "@fs_enabled": false
                                        },
                                        "Treble": {
                                            "@value": 0.91,
                                            "@fs_enabled": false
                                        },
                                        "ChVol": {
                                            "@fs_enabled": false,
                                            "@value": 0.75
                                        },
                                        "Bass": {
                                            "@fs_enabled": false,
                                            "@value": 0.85
                                        },
                                        "Presence": {
                                            "@fs_enabled": false,
                                            "@value": 0.91
                                        },
                                        "Mid": {
                                            "@value": 0.71,
                                            "@fs_enabled": false
                                        },
                                        "Master": {
                                            "@value": 0.5,
                                            "@fs_enabled": false
                                        }
                                    },
                                    "block2": {
                                        "Bright": {
                                            "@fs_enabled": false,
                                            "@value": 2
                                        },
                                        "Treble": {
                                            "@fs_enabled": false,
                                            "@value": 0.7
                                        },
                                        "ChVol": {
                                            "@value": 0.82,
                                            "@fs_enabled": false
                                        },
                                        "Drive": {
                                            "@value": 0.62,
                                            "@fs_enabled": false
                                        },
                                        "Master": {
                                            "@fs_enabled": false,
                                            "@value": 1
                                        },
                                        "Presence": {
                                            "@fs_enabled": false,
                                            "@value": 1
                                        },
                                        "Bass": {
                                            "@value": 0.2,
                                            "@fs_enabled": false
                                        }
                                    }
                                }
                            },
                            "blocks": {
                                "dsp1": {
                                    "block0": false,
                                    "block3": true,
                                    "block2": true,
                                    "block1": true
                                },
                                "dsp0": {
                                    "block2": true,
                                    "block1": false,
                                    "block3": true,
                                    "block0": false,
                                    "block4": true
                                }
                            },
                            "@ledcolor": 0,
                            "@tempo": 120,
                            "@name": "SNAPSHOT 7"
                        },
                        "dsp0": {
                            "block3": {
                                "Fat": true,
                                "SSwitch": 2,
                                "Bias": 0.5,
                                "HBE": false,
                                "@model": "HD2_AmpPlacaterDirty",
                                "Sag": 0.5,
                                "@type": 1,
                                "ChVol": 0.75,
                                "Master": 0.5,
                                "Drive": 1,
                                "Saturation": false,
                                "Mid": 0.71,
                                "@path": 0,
                                "Bass": 0.85,
                                "Voice": false,
                                "C45": false,
                                "BiasX": 0.5,
                                "Presence": 0.91,
                                "@position": 4,
                                "@enabled": false,
                                "@bypassvolume": 1,
                                "Treble": 0.91,
                                "Ripple": 0.5
                            },
                            "block4": {
                                "@model": "HD2_Cab4X12CaliV30",
                                "HighCut": 20100,
                                "@mic": 6,
                                "@type": 2,
                                "EarlyReflections": 0,
                                "@path": 0,
                                "Level": 0,
                                "@enabled": true,
                                "@position": 5,
                                "LowCut": 19.9,
                                "Distance": 1
                            },
                            "inputB": {
                                "decay": 0.5,
                                "@model": "HD2_AppDSPFlow2Input",
                                "@input": 0,
                                "threshold": -48,
                                "noiseGate": false
                            },
                            "outputA": {
                                "@output": 2,
                                "gain": 0,
                                "pan": 0.5,
                                "@model": "HD2_AppDSPFlowOutput"
                            },
                            "join": {
                                "A Level": 0,
                                "B Pan": 0.5,
                                "@model": "HD2_AppDSPFlowJoin",
                                "A Pan": 0.5,
                                "B Level": 0,
                                "Level": 0,
                                "B Polarity": false,
                                "@position": 7,
                                "@enabled": true
                            },
                            "block1": {
                                "@path": 1,
                                "@stereo": false,
                                "@position": 6,
                                "@enabled": true,
                                "Gain": -0.5,
                                "@type": 0,
                                "@model": "HD2_VolPanGain"
                            },
                            "block0": {
                                "Gain": 1.5,
                                "@position": 6,
                                "@enabled": true,
                                "@model": "HD2_VolPanGain",
                                "@type": 0,
                                "@path": 0,
                                "@stereo": false
                            },
                            "split": {
                                "Reverse": false,
                                "@enabled": true,
                                "bypass": false,
                                "@position": 6,
                                "Frequency": 650,
                                "@model": "HD2_AppDSPFlowSplitXOver"
                            },
                            "outputB": {
                                "@output": 0,
                                "gain": 0,
                                "pan": 0.5,
                                "@model": "HD2_AppDSPFlowOutput"
                            },
                            "block2": {
                                "Master": 1,
                                "Drive": 0.62,
                                "@type": 1,
                                "ChVol": 0.82,
                                "Sag": 0.5,
                                "@model": "HD2_AmpPlacaterClean",
                                "Bias": 0.5,
                                "Presence": 1,
                                "Treble": 0.7,
                                "Ripple": 0.5,
                                "@bypassvolume": 1,
                                "@enabled": true,
                                "@position": 3,
                                "Bass": 0.2,
                                "@path": 0,
                                "Bright": 2,
                                "BiasX": 0.5
                            },
                            "inputA": {
                                "decay": 0.5,
                                "@model": "HD2_AppDSPFlow1Input",
                                "@input": 1,
                                "threshold": -48,
                                "noiseGate": false
                            }
                        },
                        "snapshot3": {
                            "@valid": true,
                            "@pedalstate": 2,
                            "controllers": {
                                "dsp0": {
                                    "block2": {
                                        "Presence": {
                                            "@fs_enabled": false,
                                            "@value": 1
                                        },
                                        "Bass": {
                                            "@fs_enabled": false,
                                            "@value": 0.2
                                        },
                                        "Master": {
                                            "@fs_enabled": false,
                                            "@value": 1
                                        },
                                        "Drive": {
                                            "@value": 0.62,
                                            "@fs_enabled": false
                                        },
                                        "Bright": {
                                            "@value": 2,
                                            "@fs_enabled": false
                                        },
                                        "ChVol": {
                                            "@fs_enabled": false,
                                            "@value": 0.82
                                        },
                                        "Treble": {
                                            "@fs_enabled": false,
                                            "@value": 0.7
                                        }
                                    },
                                    "block3": {
                                        "Mid": {
                                            "@fs_enabled": false,
                                            "@value": 0.71
                                        },
                                        "Bass": {
                                            "@fs_enabled": false,
                                            "@value": 0.85
                                        },
                                        "Presence": {
                                            "@value": 0.91,
                                            "@fs_enabled": false
                                        },
                                        "Master": {
                                            "@value": 0.5,
                                            "@fs_enabled": false
                                        },
                                        "Drive": {
                                            "@value": 1,
                                            "@fs_enabled": false
                                        },
                                        "ChVol": {
                                            "@fs_enabled": false,
                                            "@value": 0.65
                                        },
                                        "Treble": {
                                            "@fs_enabled": false,
                                            "@value": 0.91
                                        }
                                    }
                                }
                            },
                            "blocks": {
                                "dsp1": {
                                    "block1": true,
                                    "block2": true,
                                    "block3": true,
                                    "block0": true
                                },
                                "dsp0": {
                                    "block2": false,
                                    "block1": true,
                                    "block0": true,
                                    "block3": true,
                                    "block4": true
                                }
                            },
                            "@tempo": 120,
                            "@ledcolor": 0,
                            "@name": "Distortion"
                        },
                        "global": {
                            "@variax_volumeknob": -0.1,
                            "@tempo": 120,
                            "@variax_customtuning": false,
                            "@variax_str3tuning": 0,
                            "@guitarinputZ": 0,
                            "@current_snapshot": 0,
                            "@cursor_group": "block2",
                            "@topology1": "A",
                            "@model": "@global_params",
                            "@variax_str5tuning": 0,
                            "@cursor_dsp": 1,
                            "@cursor_position": 6,
                            "@variax_str2tuning": 0,
                            "@variax_str4tuning": 0,
                            "@variax_toneknob": -0.1,
                            "@topology0": "SABJ",
                            "@pedalstate": 2,
                            "@variax_model": 0,
                            "@cursor_path": 0,
                            "@variax_str6tuning": 0,
                            "@variax_lockctrls": 0,
                            "@variax_str1tuning": 0,
                            "@variax_magmode": true
                        },
                        "snapshot2": {
                            "@name": "OD",
                            "@tempo": 120,
                            "@ledcolor": 0,
                            "blocks": {
                                "dsp1": {
                                    "block0": false,
                                    "block3": true,
                                    "block2": true,
                                    "block1": true
                                },
                                "dsp0": {
                                    "block3": true,
                                    "block0": true,
                                    "block4": true,
                                    "block2": false,
                                    "block1": true
                                }
                            },
                            "controllers": {
                                "dsp0": {
                                    "block3": {
                                        "Bass": {
                                            "@fs_enabled": false,
                                            "@value": 0.85
                                        },
                                        "Presence": {
                                            "@value": 0.91,
                                            "@fs_enabled": false
                                        },
                                        "Mid": {
                                            "@value": 0.71,
                                            "@fs_enabled": false
                                        },
                                        "Master": {
                                            "@value": 0.5,
                                            "@fs_enabled": false
                                        },
                                        "Drive": {
                                            "@fs_enabled": false,
                                            "@value": 0.65
                                        },
                                        "Treble": {
                                            "@fs_enabled": false,
                                            "@value": 0.91
                                        },
                                        "ChVol": {
                                            "@fs_enabled": false,
                                            "@value": 0.67
                                        }
                                    },
                                    "block2": {
                                        "Master": {
                                            "@value": 1,
                                            "@fs_enabled": false
                                        },
                                        "Bass": {
                                            "@fs_enabled": false,
                                            "@value": 0.2
                                        },
                                        "Presence": {
                                            "@value": 1,
                                            "@fs_enabled": false
                                        },
                                        "ChVol": {
                                            "@fs_enabled": false,
                                            "@value": 0.82
                                        },
                                        "Bright": {
                                            "@fs_enabled": false,
                                            "@value": 2
                                        },
                                        "Treble": {
                                            "@fs_enabled": false,
                                            "@value": 0.7
                                        },
                                        "Drive": {
                                            "@fs_enabled": false,
                                            "@value": 0.62
                                        }
                                    }
                                }
                            },
                            "@valid": true,
                            "@pedalstate": 2
                        },
                        "snapshot1": {
                            "@valid": true,
                            "@pedalstate": 2,
                            "blocks": {
                                "dsp0": {
                                    "block2": true,
                                    "block1": true,
                                    "block0": true,
                                    "block3": false,
                                    "block4": true
                                },
                                "dsp1": {
                                    "block3": true,
                                    "block0": false,
                                    "block2": true,
                                    "block1": true
                                }
                            },
                            "controllers": {
                                "dsp0": {
                                    "block2": {
                                        "ChVol": {
                                            "@value": 0.65,
                                            "@fs_enabled": false
                                        },
                                        "Treble": {
                                            "@fs_enabled": false,
                                            "@value": 1
                                        },
                                        "Bright": {
                                            "@value": 2,
                                            "@fs_enabled": false
                                        },
                                        "Drive": {
                                            "@value": 1,
                                            "@fs_enabled": false
                                        },
                                        "Master": {
                                            "@fs_enabled": false,
                                            "@value": 1
                                        },
                                        "Presence": {
                                            "@fs_enabled": false,
                                            "@value": 1
                                        },
                                        "Bass": {
                                            "@fs_enabled": false,
                                            "@value": 0
                                        }
                                    },
                                    "block3": {
                                        "Mid": {
                                            "@value": 0.71,
                                            "@fs_enabled": false
                                        },
                                        "Presence": {
                                            "@value": 0.91,
                                            "@fs_enabled": false
                                        },
                                        "Bass": {
                                            "@value": 0.85,
                                            "@fs_enabled": false
                                        },
                                        "Master": {
                                            "@fs_enabled": false,
                                            "@value": 0.5
                                        },
                                        "Drive": {
                                            "@fs_enabled": false,
                                            "@value": 1
                                        },
                                        "Treble": {
                                            "@value": 0.91,
                                            "@fs_enabled": false
                                        },
                                        "ChVol": {
                                            "@fs_enabled": false,
                                            "@value": 0.75
                                        }
                                    }
                                }
                            },
                            "@name": "Push",
                            "@ledcolor": 0,
                            "@tempo": 120
                        },
                        "snapshot0": {
                            "blocks": {
                                "dsp1": {
                                    "block1": true,
                                    "block2": true,
                                    "block0": false,
                                    "block3": true
                                },
                                "dsp0": {
                                    "block2": true,
                                    "block1": true,
                                    "split": true,
                                    "block3": false,
                                    "block0": true,
                                    "block4": true
                                }
                            },
                            "controllers": {
                                "dsp0": {
                                    "block3": {
                                        "Mid": {
                                            "@fs_enabled": false,
                                            "@value": 0.71
                                        },
                                        "Presence": {
                                            "@fs_enabled": false,
                                            "@value": 0.91
                                        },
                                        "Bass": {
                                            "@value": 0.85,
                                            "@fs_enabled": false
                                        },
                                        "Master": {
                                            "@value": 0.5,
                                            "@fs_enabled": false
                                        },
                                        "Drive": {
                                            "@value": 1,
                                            "@fs_enabled": false
                                        },
                                        "Treble": {
                                            "@value": 0.91,
                                            "@fs_enabled": false
                                        },
                                        "ChVol": {
                                            "@value": 0.75,
                                            "@fs_enabled": false
                                        }
                                    },
                                    "block2": {
                                        "Drive": {
                                            "@fs_enabled": false,
                                            "@value": 0.62
                                        },
                                        "Bright": {
                                            "@fs_enabled": false,
                                            "@value": 2
                                        },
                                        "Treble": {
                                            "@value": 0.7,
                                            "@fs_enabled": false
                                        },
                                        "ChVol": {
                                            "@value": 0.82,
                                            "@fs_enabled": false
                                        },
                                        "Bass": {
                                            "@value": 0.2,
                                            "@fs_enabled": false
                                        },
                                        "Presence": {
                                            "@fs_enabled": false,
                                            "@value": 1
                                        },
                                        "Master": {
                                            "@fs_enabled": false,
                                            "@value": 1
                                        }
                                    }
                                }
                            },
                            "@valid": true,
                            "@pedalstate": 2,
                            "@name": "Clean",
                            "@ledcolor": 0,
                            "@tempo": 120
                        },
                        "snapshot5": {
                            "controllers": {
                                "dsp0": {
                                    "block3": {
                                        "Bass": {
                                            "@value": 0.85,
                                            "@fs_enabled": false
                                        },
                                        "Presence": {
                                            "@fs_enabled": false,
                                            "@value": 0.91
                                        },
                                        "Mid": {
                                            "@value": 0.71,
                                            "@fs_enabled": false
                                        },
                                        "Master": {
                                            "@value": 0.5,
                                            "@fs_enabled": false
                                        },
                                        "Drive": {
                                            "@value": 1,
                                            "@fs_enabled": false
                                        },
                                        "Treble": {
                                            "@value": 0.91,
                                            "@fs_enabled": false
                                        },
                                        "ChVol": {
                                            "@fs_enabled": false,
                                            "@value": 0.75
                                        }
                                    },
                                    "block2": {
                                        "Bass": {
                                            "@value": 0.2,
                                            "@fs_enabled": false
                                        },
                                        "Presence": {
                                            "@value": 1,
                                            "@fs_enabled": false
                                        },
                                        "Master": {
                                            "@value": 1,
                                            "@fs_enabled": false
                                        },
                                        "Drive": {
                                            "@fs_enabled": false,
                                            "@value": 0.62
                                        },
                                        "ChVol": {
                                            "@fs_enabled": false,
                                            "@value": 0.82
                                        },
                                        "Bright": {
                                            "@value": 2,
                                            "@fs_enabled": false
                                        },
                                        "Treble": {
                                            "@fs_enabled": false,
                                            "@value": 0.7
                                        }
                                    }
                                }
                            },
                            "blocks": {
                                "dsp0": {
                                    "block4": true,
                                    "block3": true,
                                    "block0": false,
                                    "block1": false,
                                    "block2": true
                                },
                                "dsp1": {
                                    "block2": true,
                                    "block1": true,
                                    "block0": false,
                                    "block3": true
                                }
                            },
                            "@valid": true,
                            "@pedalstate": 2,
                            "@ledcolor": 0,
                            "@tempo": 120,
                            "@name": "SNAPSHOT 6"
                        },
                        "dsp1": {
                            "block1": {
                                "LowCut": 117,
                                "Predelay": 0.011,
                                "@enabled": true,
                                "@position": 5,
                                "Mix": 0.3,
                                "Level": 0,
                                "@path": 0,
                                "Decay": 0.45,
                                "@trails": false,
                                "@model": "HD2_ReverbRoom",
                                "HighCut": 3720,
                                "@type": 7
                            },
                            "inputB": {
                                "@input": 0,
                                "noiseGate": false,
                                "threshold": -48,
                                "decay": 0.5,
                                "@model": "HD2_AppDSPFlow2Input"
                            },
                            "join": {
                                "@model": "HD2_AppDSPFlowJoin",
                                "B Pan": 0.5,
                                "A Level": 0,
                                "@enabled": true,
                                "@position": 8,
                                "Level": 0,
                                "B Polarity": false,
                                "B Level": 0,
                                "A Pan": 0.5
                            },
                            "outputA": {
                                "pan": 0.5,
                                "@model": "HD2_AppDSPFlowOutput",
                                "@output": 1,
                                "gain": 9
                            },
                            "block3": {
                                "Level": 0,
                                "Emphasis": 0.09,
                                "Mix": 1,
                                "Gain": 0.5,
                                "@position": 7,
                                "@enabled": true,
                                "@stereo": true,
                                "@type": 0,
                                "@model": "HD2_CompressorLAStudioComp",
                                "PeakReduction": 0.5,
                                "Type": false,
                                "@path": 0
                            },
                            "block2": {
                                "LowFreq": 110,
                                "@position": 6,
                                "@enabled": true,
                                "Level": 0,
                                "@stereo": true,
                                "HighGain": 0,
                                "@path": 0,
                                "MidGain": -1.3,
                                "LowGain": 0,
                                "HighFreq": 8000,
                                "MidQ": 1.3,
                                "HighQ": 0.707,
                                "LowCut": 100,
                                "@type": 0,
                                "@model": "HD2_EQParametric",
                                "HighCut": 14000,
                                "MidFreq": 450,
                                "LowQ": 0.707
                            },
                            "inputA": {
                                "noiseGate": false,
                                "threshold": -48,
                                "@input": 0,
                                "@model": "HD2_AppDSPFlow1Input",
                                "decay": 0.5
                            },
                            "outputB": {
                                "pan": 0.5,
                                "@model": "HD2_AppDSPFlowOutput",
                                "gain": 0,
                                "@output": 0
                            },
                            "split": {
                                "@position": 0,
                                "@enabled": true,
                                "bypass": false,
                                "BalanceB": 0.5,
                                "@model": "HD2_AppDSPFlowSplitY",
                                "BalanceA": 0.5
                            },
                            "block0": {
                                "Scale": 1,
                                "@path": 0,
                                "Headroom": 0,
                                "@trails": false,
                                "@stereo": true,
                                "Level": 0,
                                "WowFlutter": 0.36,
                                "Time": 0.507,
                                "@enabled": false,
                                "@position": 4,
                                "Feedback": 0.18,
                                "@model": "HD2_DelayTransistorTape",
                                "@type": 7,
                                "TempoSync1": true,
                                "SyncSelect1": 6,
                                "Spread": 0.29,
                                "Mix": 0.25
                            }
                        },
                        "controller": {
                            "dsp0": {
                                "block3": {
                                    "Treble": {
                                        "@controller": 19,
                                        "@max": 1,
                                        "@min": 0
                                    },
                                    "ChVol": {
                                        "@min": 0,
                                        "@controller": 19,
                                        "@max": 1
                                    },
                                    "Drive": {
                                        "@min": 0,
                                        "@controller": 19,
                                        "@max": 1
                                    },
                                    "Master": {
                                        "@controller": 19,
                                        "@max": 1,
                                        "@min": 0
                                    },
                                    "Mid": {
                                        "@max": 1,
                                        "@controller": 19,
                                        "@min": 0
                                    },
                                    "Presence": {
                                        "@max": 1,
                                        "@controller": 19,
                                        "@min": 0
                                    },
                                    "Bass": {
                                        "@min": 0,
                                        "@controller": 19,
                                        "@max": 1
                                    }
                                },
                                "block2": {
                                    "ChVol": {
                                        "@min": 0,
                                        "@max": 1,
                                        "@controller": 19
                                    },
                                    "Bright": {
                                        "@controller": 19,
                                        "@max": 2,
                                        "@min": 0
                                    },
                                    "Treble": {
                                        "@max": 1,
                                        "@controller": 19,
                                        "@min": 0
                                    },
                                    "Drive": {
                                        "@max": 1,
                                        "@controller": 19,
                                        "@min": 0
                                    },
                                    "Master": {
                                        "@controller": 19,
                                        "@max": 1,
                                        "@min": 0
                                    },
                                    "Presence": {
                                        "@controller": 19,
                                        "@max": 1,
                                        "@min": 0
                                    },
                                    "Bass": {
                                        "@min": 0,
                                        "@controller": 19,
                                        "@max": 1
                                    }
                                }
                            }
                        },
                        "snapshot4": {
                            "controllers": {
                                "dsp0": {
                                    "block2": {
                                        "Drive": {
                                            "@fs_enabled": false,
                                            "@value": 0.62
                                        },
                                        "Treble": {
                                            "@value": 0.7,
                                            "@fs_enabled": false
                                        },
                                        "Bright": {
                                            "@value": 2,
                                            "@fs_enabled": false
                                        },
                                        "ChVol": {
                                            "@value": 0.82,
                                            "@fs_enabled": false
                                        },
                                        "Presence": {
                                            "@fs_enabled": false,
                                            "@value": 1
                                        },
                                        "Bass": {
                                            "@fs_enabled": false,
                                            "@value": 0.2
                                        },
                                        "Master": {
                                            "@value": 1,
                                            "@fs_enabled": false
                                        }
                                    },
                                    "block3": {
                                        "Drive": {
                                            "@fs_enabled": false,
                                            "@value": 1
                                        },
                                        "Treble": {
                                            "@value": 0.91,
                                            "@fs_enabled": false
                                        },
                                        "ChVol": {
                                            "@value": 0.75,
                                            "@fs_enabled": false
                                        },
                                        "Presence": {
                                            "@fs_enabled": false,
                                            "@value": 0.91
                                        },
                                        "Bass": {
                                            "@value": 0.85,
                                            "@fs_enabled": false
                                        },
                                        "Mid": {
                                            "@fs_enabled": false,
                                            "@value": 0.71
                                        },
                                        "Master": {
                                            "@value": 0.5,
                                            "@fs_enabled": false
                                        }
                                    }
                                }
                            },
                            "blocks": {
                                "dsp0": {
                                    "block1": false,
                                    "block2": true,
                                    "block4": true,
                                    "block3": true,
                                    "block0": false
                                },
                                "dsp1": {
                                    "block2": true,
                                    "block1": true,
                                    "block0": false,
                                    "block3": true
                                }
                            },
                            "@pedalstate": 2,
                            "@valid": true,
                            "@name": "SNAPSHOT 5",
                            "@ledcolor": 0,
                            "@tempo": 120
                        },
                        "snapshot7": {
                            "@valid": true,
                            "@pedalstate": 2,
                            "controllers": {
                                "dsp0": {
                                    "block2": {
                                        "Master": {
                                            "@fs_enabled": false,
                                            "@value": 1
                                        },
                                        "Presence": {
                                            "@fs_enabled": false,
                                            "@value": 1
                                        },
                                        "Bass": {
                                            "@value": 0.2,
                                            "@fs_enabled": false
                                        },
                                        "Treble": {
                                            "@value": 0.7,
                                            "@fs_enabled": false
                                        },
                                        "ChVol": {
                                            "@value": 0.82,
                                            "@fs_enabled": false
                                        },
                                        "Bright": {
                                            "@fs_enabled": false,
                                            "@value": 2
                                        },
                                        "Drive": {
                                            "@fs_enabled": false,
                                            "@value": 0.62
                                        }
                                    },
                                    "block3": {
                                        "Treble": {
                                            "@value": 0.91,
                                            "@fs_enabled": false
                                        },
                                        "ChVol": {
                                            "@value": 0.75,
                                            "@fs_enabled": false
                                        },
                                        "Drive": {
                                            "@fs_enabled": false,
                                            "@value": 1
                                        },
                                        "Master": {
                                            "@value": 0.5,
                                            "@fs_enabled": false
                                        },
                                        "Mid": {
                                            "@value": 0.71,
                                            "@fs_enabled": false
                                        },
                                        "Bass": {
                                            "@value": 0.85,
                                            "@fs_enabled": false
                                        },
                                        "Presence": {
                                            "@value": 0.91,
                                            "@fs_enabled": false
                                        }
                                    }
                                }
                            },
                            "blocks": {
                                "dsp0": {
                                    "block1": false,
                                    "block2": true,
                                    "block4": true,
                                    "block0": false,
                                    "block3": true
                                },
                                "dsp1": {
                                    "block2": true,
                                    "block1": true,
                                    "block0": false,
                                    "block3": true
                                }
                            },
                            "@name": "SNAPSHOT 8",
                            "@ledcolor": 0,
                            "@tempo": 120
                        }
                    }
                },
                "schema": "L6Preset"
            }
        );
    }
}

export default App;
