import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import SoruceData from '../Components/SourceData';


test('render with data ', () => {
  const Datashow = {
    data: {
      "_index": "wazuh-alerts-4.x-sample-security",
      "_type": "_doc",
      "_id": "3XGmr3QB4YtWQbLv1inX",
      "_score": 1.0,
      "_source": {
        "@sampledata": true,
        "timestamp": "2020-09-16T02:29:46.344+0000",
        "rule": {
          "firedtimes": 2,
          "mail": false,
          "level": 7,
          "pci_dss": [
            "11.5"
          ],
          "hipaa": [
            "164.312.c.1",
            "164.312.c.2"
          ],
          "description": "Integrity checksum changed.",
          "groups": [
            "ossec",
            "syscheck"
          ],
          "id": "550",
          "nist_800_53": [
            "SI.7"
          ],
          "gpg13": [
            "4.11"
          ],
          "gdpr": [
            "II_5.1.f"
          ]
        },
        "agent": {
          "id": "007",
          "name": "Debian",
          "ip": "24.273.97.14"
        },
        "manager": {
          "name": "wazuh-master"
        },
        "cluster": {
          "name": "wazuh"
        },
        "id": "1580123327.49031",
        "predecoder": {},
        "decoder": {},
        "data": {},
        "location": "",
        "syscheck": {
          "event": "modified",
          "path": "/var/osquery/osquery.db/CURRENT",
          "uname_after": "ossec",
          "gname_after": "root",
          "mtime_after": "2020-09-16T08:26:44.884Z",
          "size_after": 60,
          "uid_after": "S-1-5-18",
          "gid_after": "190",
          "perm_after": "rw-r--r--",
          "inode_after": 65060,
          "mtime_before": "2020-09-16T08:25:44.884Z",
          "inode_before": 21266,
          "sha1_after": "27f676d71504bb7b005a0b73c735a7b381a16fd1",
          "changed_attributes": [
            "sha1"
          ],
          "md5_after": "7edd50c699ad5a9dfbe81aafabaeed27",
          "sha256_after": "ff9a6a109a9a5584752c74ecbbb82bed50231d795da85daad7782138a23e"
        }
      }
    },
    important: true
  }
  const component = render(<SoruceData Datashow={Datashow.data} />);
  
  const date = component.getByText('Date: 2020/09/16')
  const id = component.getByText('1580123327.49031')
  const sha256 = component.getByText('sha256_after: ff9a6a109a9a5584752c74ecbbb82bed50231d795da85daad7782138a23e')
  
  expect(date).toHaveTextContent;
  expect(id).toHaveTextContent;
  expect(sha256).toHaveTextContent;
})

test('render without data ', () => {
  const agentedata = {
    Datashow: {},
    important: true
  }

  const component = render(<SoruceData Datashow={{}} />);

  const date = component.getByText('Date: Empty');
  const id = component.getByText('Id: Empty')
  const sha256 = component.getByText('sha256_after: Empty')


  expect(date).toHaveTextContent;
  expect(id).toHaveTextContent;
  expect(sha256).toHaveTextContent;
})



