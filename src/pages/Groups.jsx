import React, { memo, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/layout';
import { Button } from '@/components/common';
import { GroupCard } from '@/components/feature';
import AddGroupModal from '@/components/feature/AddGroupModal';
import { useApp } from '@/context';
import { getGroupRoute, MESSAGES } from '@/constants';

const Groups = memo(() => {
  const navigate = useNavigate();
  const { groups } = useApp();
  const [isAddGroupOpen, setIsAddGroupOpen] = useState(false);

  const groupsList = useMemo(
    () => Object.values(groups),
    [groups]
  );

  const handleGroupClick = (groupId) => {
    navigate(getGroupRoute(groupId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Groups"
        actions={
          <Button
            onClick={() => setIsAddGroupOpen(true)}
            size="sm"
            icon={<span>➕</span>}
          >
            <span className="hidden sm:inline">New Group</span>
          </Button>
        }
      />

      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {groupsList.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">👥</div>
            <p className="text-lg font-semibold text-gray-900 mb-2">
              {MESSAGES.NO_GROUPS}
            </p>
            <Button
              onClick={() => setIsAddGroupOpen(true)}
              className="mt-4"
            >
              Create Your First Group
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {groupsList.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                onClick={() => handleGroupClick(group.id)}
              />
            ))}
          </div>
        )}
      </div>

      <AddGroupModal
        isOpen={isAddGroupOpen}
        onClose={() => setIsAddGroupOpen(false)}
      />
    </div>
  );
});

Groups.displayName = 'Groups';

export default Groups;

