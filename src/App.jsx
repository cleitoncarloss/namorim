import React, { useState, useEffect } from 'react';
import { supabase } from './services/supabase';
import Auth from './pages/Auth';
import Account from './pages/Account';
import Home from './pages/Home';
import Matches from './pages/Matches';
import Chat from './pages/Chat';
import LikesYou from './pages/LikesYou';
import GoPremium from './pages/GoPremium';

function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [view, setView] = useState({ name: 'home' });

  useEffect(() => {
    // Fetch session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      // Clear profile on logout
      if (!session) {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    async function getOrCreateProfile() {
      if (!session) return;

      // First, try to fetch the profile
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error && error.code === 'PGRST116') {
        // Handle the case where the profile does not exist for a new user
        console.log('Profile not found, creating one for the new user.');
        
        const userEmail = session.user.email || 'new_user';
        const defaultUsername = userEmail.split('@')[0] + Math.floor(Math.random() * 1000);

        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: session.user.id,
            username: defaultUsername,
            bio: 'Welcome to Namorim!',
          })
          .select()
          .single();
        
        if (insertError) {
          console.error('Error creating profile:', insertError);
        } else {
          setProfile(newProfile);
          // Redirect the new user to their account page to complete their profile
          setView({ name: 'account' });
        }
      } else if (error) {
        // Handle other potential errors
        console.error('Error fetching profile:', error);
      } else {
        // Profile found, set it
        setProfile(data);
      }
    }

    getOrCreateProfile();
  }, [session, view.force_reload]); // re-fetch profile on session change or forced reload

  const renderView = () => {
    if (!session || !profile) {
      // Show Auth page if no session, or a loading indicator while profile is fetching
      return !session ? <Auth /> : <div className="loading-container"><p>Loading Profile...</p></div>;
    }

    switch (view.name) {
      case 'account':
        return <Account key={session.user.id} session={session} setView={setView} />;
      case 'matches':
        return <Matches session={session} setView={setView} />;
      case 'chat':
        return <Chat session={session} setView={setView} chatPartner={view.partner} />;
      case 'likes-you':
        return profile.is_premium 
          ? <LikesYou session={session} setView={setView} />
          : <GoPremium session={session} setView={setView} />;
      default:
        return <Home session={session} setView={setView} />;
    }
  };

  return <div className="container">{renderView()}</div>;
}

export default App;
