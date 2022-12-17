import AppBase from './AppBase';
import { layout, dialogs } from './examples/ui-test-layout';
import { events } from './examples/ui-test-events';
import { EventAnalyzer } from './event/EventAnalyzer';


const data_source = []

const data_transform = {}


class App extends AppBase {

  state = {
    modal: dialogs,
    view: layout.root,
    data: data_source,
    sources: data_source,
    events: events,
    transform: data_transform
  };

  constructor(props) {
    super(props);
    this.initDataSources(this.state);

    if (window) {
      window._app = this;
    }
  }

  renderReady = () => {
  }

  runReport = () => {
    return EventAnalyzer.getInstance().validateEventActions(events);
  }
}


export default App;

